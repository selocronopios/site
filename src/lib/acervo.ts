import fs from 'fs';
import path from 'path';

export interface Colecao {
  id: string;
  name: string;
  description?: string;
  parentCollection?: string | null;
  order: number;
  subcolecoesCount?: number;
}

export interface Ebook {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  collection: string;
  collectionName: string;
  authors: string[];
  keywords: string[];
  description: string;
  authorship?: string;
  summary?: string;
  publisher: string;
  year: number;
  edition?: string;
  pages?: number;
  format: string;
  isbn?: string;
  cover: string;
  pdf: string;
  created_at: string;
  published: boolean;
}

const COLECOES_DIR = path.join(process.cwd(), 'src/content/colecoes');
const EBOOKS_DIR = path.join(process.cwd(), 'src/content/ebooks');

function normalizarSlug(valor?: string | null): string | null {
  if (!valor) return null;
  return path.basename(valor, '.json');
}

export function gerarSlug(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function lerArquivosJson<T>(diretorio: string): Array<T & { id: string }> {
  if (!fs.existsSync(diretorio)) return [];

  return fs
    .readdirSync(diretorio)
    .filter((arquivo) => arquivo.endsWith('.json'))
    .map((arquivo) => {
      const id = arquivo.replace(/\.json$/, '');
      const conteudo = fs.readFileSync(path.join(diretorio, arquivo), 'utf-8');
      return {
        id,
        ...JSON.parse(conteudo),
      };
    });
}

export function getColecoesPrincipais(): Colecao[] {
  const todas = getColecoes();
  return todas
    .filter((col) => !col.parentCollection)
    .map((col) => ({
      ...col,
      subcolecoesCount: todas.filter((sub) => sub.parentCollection === col.id)
        .length,
    }));
}

export function getColecoes(): Colecao[] {
  return lerArquivosJson<
    Partial<Colecao> & {
      titulo?: string;
      descricao?: string;
      colecaoPai?: string | null;
      ordem?: number;
    }
  >(COLECOES_DIR)
    .map((col) => ({
      id: col.id,
      name: col.name ?? col.titulo ?? col.id,
      description: col.description ?? col.descricao ?? '',
      parentCollection: normalizarSlug(col.parentCollection ?? col.colecaoPai),
      order: col.order ?? col.ordem ?? 99,
    }))
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, 'pt-BR'));
}

export function getColecaoPorId(id: string): Colecao | undefined {
  return getColecoes().find((col) => col.id === id);
}

export function getEbooks(): Ebook[] {
  const mapaColecoes = new Map(getColecoes().map((col) => [col.id, col.name]));
  const slugsUsados = new Set<string>();

  return lerArquivosJson<Partial<Ebook> & { slug?: string }>(EBOOKS_DIR)
    .filter((ebook) => ebook.published !== false)
    .map((ebook) => {
      const collectionId = normalizarSlug(ebook.collection) ?? '';
      const slugInformado = ebook.slug?.trim();
      const baseSlug = gerarSlug(slugInformado || ebook.title || ebook.id);

      let slugFinal = baseSlug || ebook.id;
      let contador = 2;
      while (slugsUsados.has(slugFinal)) {
        slugFinal = `${baseSlug}-${contador}`;
        contador += 1;
      }
      slugsUsados.add(slugFinal);
      return {
        id: ebook.id,
        slug: slugFinal,
        title: ebook.title ?? ebook.id,
        subtitle: ebook.subtitle,
        collection: collectionId,
        collectionName: mapaColecoes.get(collectionId) ?? 'Catálogo Geral',
        authors: ebook.authors ?? [],
        keywords: ebook.keywords ?? [],
        description: ebook.description ?? '',
        authorship: ebook.authorship,
        summary: ebook.summary,
        publisher: ebook.publisher || 'Selo Editorial Cronópios',
        year: ebook.year ?? new Date().getFullYear(),
        edition: ebook.edition,
        pages: ebook.pages,
        format: ebook.format || 'PDF (eBook)',
        isbn: ebook.isbn,
        cover: ebook.cover ?? '',
        pdf: ebook.pdf ?? '',
        created_at: ebook.created_at || '2026-01-01',
        published: ebook.published ?? true,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
}

export function getEbookPorSlug(slug: string): Ebook | undefined {
  if (!slug) return undefined;
  const slugNormalizado = decodeURIComponent(slug).trim();

  return getEbooks().find(
    (ebook) => ebook.slug === slugNormalizado || ebook.id === slugNormalizado
  );
}

// export function getEbookPorId(id: string): Ebook | undefined {
//   return getEbooks().find((ebook) => ebook.id === id);
// }

export function getEbooksPorColecao(colecaoId: string): Ebook[] {
  return getEbooks().filter((ebook) => ebook.collection === colecaoId);
}

export function resumirParaSeo(
  texto: string | undefined,
  fallback: string
): string {
  if (!texto || !texto.trim()) return fallback;

  const limpo = texto.replace(/\s+/g, ' ').trim();
  if (limpo.length <= 155) return limpo;

  return `${limpo.slice(0, 152).replace(/\s+\S*$/, '')}...`;
}
