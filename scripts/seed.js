import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dataToCreate = [
  {
    id: 1,
    title: 'Overgeared',
    author: 'Monohumbang, Saenal',
    synopsys:
      "Shin Yungwoo punya kehidupan yang bernasib sial. Ia terpaksa bekerja keras untuk membayar biaya sekolah dan unag game yang ia gunakan. Bahkan ia juga kerja kasar di VR Game bernama Satisfy. Namun, hidupnya berubah ketika karakternya mnemukan 'Pagma's Rare Book'",
    genre: 'Action, Adventure, Fantasy, Game, Magic, Project',
    release: new Date('2020-01-01'),
    status: 'ongoing',
  },
  {
    id: 2,
    title: 'Standard of Reincarnation',
    author: 'Blue Jaeng-i, KimPyung-beom',
    synopsys:
      'Keluarga bela diri terbesar, Samion. Daven, anggota keluarga Samion, adalah seorang Ahli Bela diri berlengan satu.',
    genre: 'Action, Adventure, Manhwa, Project',
    release: new Date('2022-01-01'),
    status: 'ongoing',
  },
  {
    id: 3,
    title: 'Return Of Frozen Player',
    author: 'JerryM',
    synopsys: 'Pemain Beku',
    genre: 'Action, Adventure, Fantasy, Magic, Manhwa, Project',
    release: new Date('2020-01-01'),
    status: 'ongoing',
  },
];

const seed = async (comics) => {
  console.log('Seeding...');
  comics.forEach(async (comic) => {
    await prisma.comic.upsert({
      where: { id: comic.id },
      update: comic,
      create: comic,
    });
  });
};

seed(dataToCreate)
  .then(() => console.log('Data seeded successfully'))
  .catch((e) => console.error('Data seed failed ', e))
  .finally(() => {
    prisma.$disconnect();
    console.log('Client disconnected successfully');
  });
