import Link from 'next/link';
import MoldovaElectionGame from './game';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <section className="w-full border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">
              Виборчі симулятори Східної Європи
            </h1>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl">
              Оберіть потрібний сценарій та випробуйте свої сили в політичній кампанії. На головній сторінці доступна актуальна симуляція президентських виборів Молдови 2028, а також новий окремий сценарій повторного голосування в Україні 2004 року.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
            <Link href="/ukraine-2004" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-sm md:text-base px-5 py-6 rounded-xl shadow-lg">
                🇺🇦 Президентські вибори Україна 2004
              </Button>
            </Link>
            <a
              href="https://github.com/dmitriyhajrulin03-ctrl/moldova-election-game"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="w-full sm:w-auto text-sm md:text-base px-5 py-6 rounded-xl">
                Репозиторій GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <MoldovaElectionGame />
      </main>
    </div>
  );
}
