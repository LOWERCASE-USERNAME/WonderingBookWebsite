import React from 'react';

interface IdeaCardProps {
  children?: React.ReactNode;
}

export function IdeaCard(
  { children }: IdeaCardProps
) {
  return (
    <>
      <div className='bg-white w-[560px]'>
        <img className='h-40 w-full' />
        <div className='font-bold text-lg'>The Principles of Digital Minimalism</div>
        <div>
          <ol className='list-decimal'>
            <li>Clutter is costly – Cal Newport is not just talking about physical clutter. You want to avoid cluttering your time and attention with too many devices, apps and services. If you do not reduce this clutter, your small benefits will diminish.</li>
            <li>Optimization is essential – To extract maximal benefit from the technology you use, you must think carefully about how and why you are using it. Always aim to optimize how you are using this technology.</li>
            <li>Intentionality is satisfying – Becoming a digital minimalist means that you gain satisfaction from intentionally engaging with new technologies.</li>
          </ol>
        </div>
      </div>
      {children}
    </>
  );
}
