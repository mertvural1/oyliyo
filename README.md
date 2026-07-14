# Oyliyo

Oyliyo, paylaşılabilir bağlantılarla gerçek zamanlı anket oluşturmayı sağlayan React uygulamasıdır. Katılımcılar oy kullanabilir, seçimlerini değiştirebilir ve sonuçları anlık takip edebilir.

## Özellikler

- Üç adımda anket oluşturma
- Paylaşılabilir oda bağlantıları
- Firebase Realtime Database ile canlı sonuçlar
- Oy değiştirme desteği
- Açık/koyu tema tercihini hatırlama
- Mobil uyumlu arayüz

## Teknolojiler

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase Realtime Database

## Canlı demo

Vercel üzerinden yayınlanan proje: https://oyliyo.vercel.app

## Başlangıç

Gerekli paketleri kurun:

```bash
npm install
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Üretim derlemesi oluşturun:

```bash
npm run build
```

## Firebase yapılandırması

Firebase ayarları [src/lib/firebase.ts](src/lib/firebase.ts) dosyasında yer alır. Anket kayıtları Realtime Database içinde şu yapıda tutulur:

```text
polls/
  ODA_KODU/
    question: "..."
    choices:
      - id: "..."
        text: "..."
        votes: 0
```

Geliştirme sırasında Realtime Database kuralları için aşağıdaki yapı kullanılabilir:

```json
{
  "rules": {
    "polls": {
      "$pollId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

> Bu kurallar herkese okuma ve yazma izni verir. Canlı ortamda Firebase Authentication veya sunucu tarafı doğrulama ile daha kısıtlı kurallar kullanılmalıdır.

## Proje yapısı

```text
src/
  assets/       Görsel varlıklar
  components/   Arayüz bileşenleri
  hooks/        React custom hook'ları
  lib/          Firebase ve anket yardımcıları
  types/        TypeScript tipleri
```

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusunu başlatır. |
| `npm run build` | TypeScript kontrolü yapar ve üretim çıktısı oluşturur. |
| `npm run preview` | Üretim derlemesini yerelde önizler. |
| `npm run lint` | Kaynak kodu ESLint ile denetler. |
