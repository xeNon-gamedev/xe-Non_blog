import React from 'react';

interface QuestionProps {
  children: React.ReactNode;
}

export function Question({ children }: QuestionProps) {
  return (
    <div className="my-12 py-8 px-6 border-l-4 border-blue-500 bg-blue-500/5 rounded-r-xl">
      <div className="text-2xl md:text-3xl font-bold text-white leading-snug flex gap-2">
        <span className="flex-shrink-0">Q.</span>
        <div className="[&>p]:my-0 [&>p]:inline-block">{children}</div>
      </div>
    </div>
  );
}
