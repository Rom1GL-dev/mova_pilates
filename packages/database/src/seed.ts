import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

async function main() {
  console.log('🧹 Nettoyage de la base de données...');

  // Suppression dans l'ordre inverse des dépendances
  await prisma.log.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.session.deleteMany();
  await prisma.pack.deleteMany();
  await prisma.typeCourse.deleteMany();
  await prisma.legalDocument.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Base de données nettoyée');

  console.log('👤 Création du compte dev...');

  // Hashage du mot de passe
  const hashedPassword = await bcrypt.hash('testest', SALT_ROUNDS);

  // Création du compte admin dev
  const devUser = await prisma.user.create({
    data: {
      email: 'dev@romain-gilot.fr',
      password: hashedPassword,
      firstname: 'Dev',
      lastname: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('✅ Compte dev créé:', devUser.email);
  console.log('📧 Email: dev@romain-gilot.fr');
  console.log('🔑 Mot de passe: testest');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });