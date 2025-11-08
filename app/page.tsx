import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const scenarios = [
  {
    id: 'moldova-presidential',
    title: 'Молдова · Президентські вибори 2028',
    description:
      'Очольте одного з фаворитів молдовської кампанії 2028 року та проведіть його через два тури.',
    href: '/moldova-presidential',
    flagSrc: '/flags/moldova.svg',
    flagAlt: 'Прапор Молдови',
  },
  {
    id: 'moldova-parliamentary',
    title: 'Молдова · Парламентські вибори 2025',
    description:
      'Зберіть власну коаліцію та спробуйте здобути більшість у законодавчому органі Молдови.',
    href: '/moldova-parliamentary',
    flagSrc: '/flags/moldova.svg',
    flagAlt: 'Прапор Молдови',
  },
  {
    id: 'ukraine-2004',
    title: 'Україна · Президентські вибори 2004',
    description:
      'Переживіть драму помаранчевої революції та повторного голосування грудня 2004 року.',
    href: '/ukraine-2004',
    flagSrc: '/flags/ukraine.svg',
    flagAlt: 'Прапор України',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      <section className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Центр виборчих симуляторів
            </h1>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
              Оберіть один із доступних сценаріїв та спробуйте свої сили у політичній кампанії. Наразі
              доступні два сценарії для Молдови та історичний сценарій повторного голосування в Україні 2004 року.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <a
              href="https://github.com/dmitriyhajrulin03-ctrl/moldova-election-game"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" className="w-full sm:w-auto px-5 py-6 rounded-xl text-sm md:text-base">
                Переглянути код на GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((scenario) => (
          <Link key={scenario.id} href={scenario.href} className="group">
            <Card className="h-full p-6 flex flex-col gap-4 border-2 border-transparent group-hover:border-slate-300 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-8 overflow-hidden rounded shadow-sm">
                  <Image
                    src={scenario.flagSrc}
                    alt={scenario.flagAlt}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-slate-900 leading-snug">{scenario.title}</h2>
              </div>
              <p className="text-slate-600 text-sm flex-1">{scenario.description}</p>
              <Button className="mt-2 bg-slate-900 hover:bg-slate-700 text-white rounded-xl">
                Розпочати сценарій
              </Button>
            </Card>
          </Link>
        ))}
      </main>
    </div>
  );
}
