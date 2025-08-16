'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface KeywordsInputProps {
  value: string[];
  onChange: (keywords: string[]) => void;
  suggestions: string[];
}

export default function KeywordsInput({
  value,
  onChange,
  suggestions,
}: KeywordsInputProps) {
  const [input, setInput] = useState('');

  const addKeyword = (keyword: string) => {
    const trimmed = keyword.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput('');
  };

  const removeKeyword = (keyword: string) => {
    onChange(value.filter((k) => k !== keyword));
  };

  // Sugestões que ainda não foram selecionadas
  const filteredSuggestions = suggestions.filter((s) => !value.includes(s));

  return (
    <div className="space-y-2">
      {/* Palavras já selecionadas */}
      <div className="flex flex-wrap gap-2">
        {value.map((keyword) => (
          <Badge key={keyword} className="flex items-center gap-1 pr-1">
            {keyword}
            <X
              className="w-3 h-3 cursor-pointer hover:opacity-70"
              onClick={() => removeKeyword(keyword)}
            />
          </Badge>
        ))}
      </div>

      {/* Input de nova palavra-chave */}
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addKeyword(input);
          }
        }}
        placeholder="Digite e pressione Enter"
      />

      {/* Sugestões clicáveis */}
      <div className="flex flex-wrap gap-2">
        {filteredSuggestions.map((suggestion) => (
          <Badge
            key={suggestion}
            variant="outline"
            className="cursor-pointer hover:bg-muted"
            onClick={() => addKeyword(suggestion)}
          >
            {suggestion}
          </Badge>
        ))}
      </div>
    </div>
  );
}
