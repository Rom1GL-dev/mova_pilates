# 🚨 Système de Monitoring et Alertes Discord

Ce projet inclut un système complet de monitoring qui envoie des alertes Discord en temps réel pour les erreurs critiques.

## 📊 Types d'alertes

### Alertes automatiques (via GlobalExceptionFilter)
- ❌ **Erreurs 500** - Toutes les erreurs serveur
- 💾 **Erreurs Prisma** - Problèmes de base de données
- 💳 **Erreurs Stripe** - Échecs de paiement
- 📧 **Erreurs Email** - Échecs d'envoi d'emails
- 🔐 **Erreurs Redis/Session** - Problèmes de session

### Niveaux de gravité
- 🔴 **CRITICAL** - Erreurs critiques nécessitant une action immédiate
- 🟠 **ERROR** - Erreurs importantes
- 🟡 **WARNING** - Avertissements
- 🔵 **INFO** - Informations

## ⚙️ Configuration

### 1. Variables d'environnement

Ajoutez dans votre `.env` :

```env
# Discord Monitoring Webhook
DISCORD_ALERT_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Optionnel: Activer les alertes en dev (par défaut: false)
ENABLE_DEV_ALERTS=false
```

### 2. Créer un Webhook Discord

1. Discord → **Paramètres du serveur** → **Intégrations** → **Webhooks**
2. **Nouveau Webhook**
3. Nommez-le "MOVA Pilates - Monitoring"
4. Choisissez un canal dédié (ex: `#alertes`)
5. Copiez l'URL du webhook

## 💻 Utilisation dans le code

### Utilisation simple

```typescript
import { DiscordAlertService } from '@/shared/services/discord-alert.service';

export class MyService {
  constructor(
    private readonly discordAlertService: DiscordAlertService,
  ) {}

  async doSomething() {
    try {
      // Votre code...
    } catch (error) {
      // Envoyer une alerte critique
      await this.discordAlertService.critical(
        'Erreur critique',
        'Description de l\'erreur',
        error as Error,
        {
          'Contexte': 'Informations supplémentaires',
          'UserId': userId,
        },
      );
      throw error;
    }
  }
}
```

### Méthodes disponibles

```typescript
// Alerte critique (rouge)
await discordAlertService.critical(
  title: string,
  description: string,
  error?: Error,
  context?: Record<string, any>,
);

// Alerte d'erreur (orange)
await discordAlertService.error(
  title: string,
  description: string,
  error?: Error,
  context?: Record<string, any>,
);

// Avertissement (jaune)
await discordAlertService.warning(
  title: string,
  description: string,
  context?: Record<string, any>,
);

// Information (bleu)
await discordAlertService.info(
  title: string,
  description: string,
  context?: Record<string, any>,
);
```

### Exemple avancé

```typescript
// Surveiller les paiements Stripe
async processPayment(orderId: string) {
  try {
    const payment = await this.stripe.createPayment(...);

    if (payment.status === 'failed') {
      await this.discordAlertService.error(
        'Paiement échoué',
        `Le paiement de la commande ${orderId} a échoué`,
        undefined,
        {
          'Commande ID': orderId,
          'Montant': payment.amount,
          'Raison': payment.failure_message,
        },
      );
    }

    return payment;
  } catch (error) {
    await this.discordAlertService.critical(
      'Erreur Stripe critique',
      `Impossible de traiter le paiement`,
      error as Error,
      {
        'Commande ID': orderId,
      },
    );
    throw error;
  }
}
```

## 🎯 Bonnes pratiques

### ✅ À faire
- Utiliser les alertes pour les erreurs qui nécessitent une action
- Inclure du contexte utile (IDs, valeurs importantes)
- Utiliser le bon niveau de gravité
- Garder les titres courts et descriptifs

### ❌ À éviter
- Envoyer des alertes pour des erreurs normales (401, 404)
- Spammer avec trop d'alertes
- Inclure des données sensibles (mots de passe, tokens)
- Utiliser en développement (sauf si ENABLE_DEV_ALERTS=true)

## 🧪 Test du système

Pour tester le système d'alertes, créez un endpoint de test :

```typescript
@Get('/test-alert')
async testAlert() {
  await this.discordAlertService.info(
    'Test d\'alerte',
    'Ceci est un test du système d\'alertes',
    undefined,
    {
      'Environnement': process.env.NODE_ENV,
      'Timestamp': new Date().toISOString(),
    },
  );

  return { message: 'Alerte envoyée avec succès' };
}
```

## 📈 Métriques suggérées

Vous pouvez étendre le système pour monitorer :
- Temps de réponse des API
- Taux d'erreur par heure
- Nombre de tentatives de connexion échouées
- Utilisation de la base de données
- Files d'attente Redis

## 🔒 Sécurité

- Ne jamais exposer le webhook URL publiquement
- Utiliser les secrets GitHub Actions pour le CI/CD
- Limiter les données sensibles dans les alertes
- Utiliser un canal Discord privé

## 📞 Support

En cas de problème avec le système d'alertes, vérifiez :
1. Le webhook URL est valide
2. L'environnement est en production (ou ENABLE_DEV_ALERTS=true)
3. Les logs de l'application pour les erreurs d'envoi
4. Les permissions du webhook Discord
