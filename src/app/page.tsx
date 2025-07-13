import Maintenance from '@/components/Maintenance';
import { H1, H2, Body, ButtonText } from '@/components/Typography';

export default function Home() {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if (isMaintenance) {
    return <Maintenance />;
  }

  return (
    <div className="bg-background p-8">
      <H1>História Intelectual UFMG</H1>
      <H2 className="mt-4">Subtítulo Importante</H2>
      <Body className="mt-4">
        Este é um texto de corpo explicando alguma coisa sobre o site.
      </Body>
      <button className="btn mt-6">
        <ButtonText>Saiba Mais</ButtonText>
      </button>
    </div>
  );
}
