'use client';

import React, { createContext, useContext, useState } from 'react';

const AccordionContext = createContext(null);

export function Accordion({ children, type = 'single', collapsible = true, className = '' }) {
  const [openItems, setOpenItems] = useState(new Set());

  const toggle = (value) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else {
        if (type === 'single') next.clear();
        next.add(value);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, children }) {
  return <div data-value={value}>{children}</div>;
}

export function AccordionTrigger({ children, className = '' }) {
  const ctx = useContext(AccordionContext);
  const item = React.useContext(ItemContext);
  const isOpen = ctx.openItems.has(item);
  return (
    <button onClick={() => ctx.toggle(item)} className={className}>
      {children}
      <svg className={`w-3 h-3 text-white/20 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function AccordionContent({ children, className = '' }) {
  const ctx = useContext(AccordionContext);
  const item = React.useContext(ItemContext);
  const isOpen = ctx.openItems.has(item);
  if (!isOpen) return null;
  return <div className={className}>{children}</div>;
}

const ItemContext = createContext(null);

export function AccordionRoot({ children, ...props }) {
  return <Accordion {...props}>{children}</Accordion>;
}
