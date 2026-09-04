import type { Block, ListItem } from '@/content/articles';

function ListEntry({ item }: { item: ListItem }) {
  return (
    <>
      {item.lead ? <span className="font-bold text-gray-900 mr-2">{item.lead}</span> : null}
      {item.text}
    </>
  );
}

/**
 * Renders the block model extracted from the reference articles. Section
 * boundaries arrive as flat sectionStart/sectionEnd markers, so they are folded
 * back into real <section> elements here.
 */
export function ArticleBlocks({ blocks }: { blocks: Block[] }) {
  const out: React.ReactNode[] = [];
  let buffer: React.ReactNode[] | null = null;
  let sectionClass = '';
  let key = 0;

  const push = (node: React.ReactNode) => (buffer ?? out).push(node);

  for (const block of blocks) {
    key += 1;
    switch (block.type) {
      case 'sectionStart':
        buffer = [];
        sectionClass = block.className;
        break;
      case 'sectionEnd':
        out.push(
          <section key={`s${key}`} className={sectionClass}>
            {buffer}
          </section>,
        );
        buffer = null;
        break;
      case 'heading':
        push(
          <h2 key={key} className={block.className}>
            {block.text}
          </h2>,
        );
        break;
      case 'paragraph':
        push(
          <p key={key} className={block.className}>
            {block.text}
          </p>,
        );
        break;
      case 'list':
        push(
          block.ordered === 'disc' ? (
            <ul key={key} className={block.className}>
              {block.items.map((item, i) => (
                <li key={i}>
                  <ListEntry item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <ul key={key} className={block.className}>
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <ListEntry item={item} />
                </li>
              ))}
            </ul>
          ),
        );
        break;
      case 'cards':
        push(
          <div key={key} className={block.containerClass}>
            {block.cards.map((card, i) => (
              <div key={i} className={block.cardClass}>
                <h3 className={card.titleClass}>{card.title}</h3>
                {card.paragraphs.map((p, j) => (
                  <p key={j} className={card.paragraphClass}>
                    {p}
                  </p>
                ))}
                {card.items.length > 0 && (
                  <ul className={card.listClass}>
                    {card.items.map((item, j) => (
                      <li key={j}>
                        {item.lead ? (
                          <span className="font-semibold text-gray-800">{item.lead}</span>
                        ) : null}
                        {item.lead ? ' ' : ''}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>,
        );
        break;
      case 'imageGrid':
        push(
          <div key={key} className={block.cols}>
            {block.images.map((image) => (
              <div
                key={image.src}
                className="aspect-square rounded-2xl overflow-hidden shadow-md bg-gray-100 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>,
        );
        break;
    }
  }
  return <>{out}</>;
}
