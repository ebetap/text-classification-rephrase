# Text Classification Rephrase

## Deskripsi

Text Classification Rephrase adalah framework JavaScript yang menggunakan TensorFlow.js untuk mengklasifikasikan dan merephrase teks/komentar. Jika komentar bersifat negatif, framework ini akan mengubahnya menjadi positif/menyemangati. Jika komentar sudah positif, framework ini akan memperbaikinya menjadi lebih positif. Framework ini mendukung berbagai bahasa termasuk bahasa Indonesia.

## Fitur

- **Klasifikasi Teks**: Menggunakan model TensorFlow.js untuk mengklasifikasikan komentar sebagai positif atau negatif.
- **Rephrase Teks**: Mengubah komentar negatif menjadi positif dan memperbaiki komentar positif.
- **Dukungan Multibahasa**: Mendukung beberapa bahasa termasuk Inggris, Spanyol, Prancis, dan Indonesia.
- **Logging**: Logging terintegrasi untuk memantau dan mendebug proses.

## Instalasi

Untuk menginstal package, jalankan perintah berikut:

```bash
npm install text-classification-rephrase
```

## Penggunaan

Berikut adalah contoh penggunaan dasar framework:

```javascript
const TextClassificationRephrase = require('text-classification-rephrase');

(async () => {
  const framework = new TextClassificationRephrase({
    en: './models/en/text_classification_model.json',
    es: './models/es/text_classification_model.json',
    fr: './models/fr/text_classification_model.json',
    id: './models/id/text_classification_model.json'
  }, {
    en: './embeddings/en/word2vec.bin',
    es: './embeddings/es/word2vec.bin',
    fr: './embeddings/fr/word2vec.bin',
    id: './embeddings/id/word2vec.bin'
  });

  await framework.init();

  const comment = "Kerja bagus!";
  const processedComment = await framework.processComment(comment);
  console.log(processedComment); // Output: "Itu hebat! Kerja bagus!"
})();
```

### Penjelasan

1. **Inisialisasi**: Framework diinisialisasi dengan jalur model dan embedding untuk bahasa yang didukung.
2. **Memproses Komentar**: Memanggil metode `processComment` untuk mengklasifikasikan dan merephrase komentar.

## Pelatihan Model Baru

Anda dapat melatih model baru menggunakan TensorFlow dan menyimpannya dalam format yang dapat dibaca oleh TensorFlow.js. Berikut adalah contoh pelatihan model untuk bahasa Indonesia:

```python
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Data dummy untuk ilustrasi
comments = ["Kerja bagus", "Ini buruk"]
labels = [1, 0]  # 1 untuk positif, 0 untuk negatif

def preprocess(comment):
    return [len(word) for word in comment.split()]

X = tf.keras.preprocessing.sequence.pad_sequences([preprocess(c) for c in comments], maxlen=10)
y = tf.keras.utils.to_categorical(labels)

model = Sequential([
    Dense(10, activation='relu', input_shape=(10,)),
    Dense(2, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

model.fit(X, y, epochs=10)

model.save('text_classification_model')
```

Ekspor model untuk TensorFlow.js:

```bash
tensorflowjs_converter --input_format keras text_classification_model models/id/text_classification_model
```

Dengan mengikuti langkah-langkah di atas, Anda akan memiliki model yang siap digunakan dalam framework ini.

## Logging

Framework ini juga mendukung logging untuk memantau dan mendebug proses. Log disimpan di file `app.log` di direktori proyek.

```javascript
const { logger } = require('./src/logger');

logger.info('Informational message');
logger.error('Error message');
```

## Menambahkan Bahasa Baru

Untuk menambahkan bahasa baru, Anda perlu:

1. Melatih model klasifikasi teks untuk bahasa tersebut.
2. Menyediakan embeddings untuk bahasa tersebut.
3. Memperbarui `modelPaths` dan `embeddingPaths` dalam inisialisasi framework dengan jalur ke model dan embeddings baru.

### Contoh

```javascript
const framework = new TextClassificationRephrase({
  en: './models/en/text_classification_model.json',
  es: './models/es/text_classification_model.json',
  fr: './models/fr/text_classification_model.json',
  id: './models/id/text_classification_model.json',
  your_lang: './models/your_lang/text_classification_model.json'
}, {
  en: './embeddings/en/word2vec.bin',
  es: './embeddings/es/word2vec.bin',
  fr: './embeddings/fr/word2vec.bin',
  id: './embeddings/id/word2vec.bin',
  your_lang: './embeddings/your_lang/word2vec.bin'
});
```

## Contributing

Kami menerima kontribusi dari semua pihak. Jika Anda menemukan bug atau memiliki fitur yang ingin ditambahkan, silakan buat pull request atau ajukan issue di repositori GitHub kami.

## Lisensi

Framework ini dilisensikan di bawah lisensi MIT. Lihat file `LICENSE` untuk informasi lebih lanjut.

## Struktur Proyek

```
text-classification-rephrase/
│
├── src/
│   ├── index.js
│   ├── classify.js
│   ├── rephrase.js
│   ├── language.js
│   ├── preprocess.js
│   └── logger.js
│
├── models/
│   ├── en/
│   │   └── text_classification_model.json
│   ├── es/
│   │   └── text_classification_model.json
│   ├── fr/
│   │   └── text_classification_model.json
│   └── id/
│       └── text_classification_model.json
│
├── embeddings/
│   ├── en/
│   │   └── word2vec.bin
│   ├── es/
│   │   └── word2vec.bin
│   ├── fr/
│   │   └── word2vec.bin
│   └── id/
│       └── word2vec.bin
│
├── tests/
│   └── index.test.js
│
├── .gitignore
├── package.json
└── README.md
```

## Pengujian

Gunakan Jest untuk pengujian:

```bash
npm test
```

#### `tests/index.test.js`

```javascript
const TextClassificationRephrase = require('../src/index');

test('Framework processes comments correctly', async () => {
  const framework = new TextClassificationRephrase({
    en: './models/en/text_classification_model.json',
    es: './models/es/text_classification_model.json',
    fr: './models/fr/text_classification_model.json',
    id: './models/id/text_classification_model.json'
  }, {
    en: './embeddings/en/word2vec.bin',
    es: './embeddings/es/word2vec.bin',
    fr: './embeddings/fr/word2vec.bin',
    id: './embeddings/id/word2vec.bin'
  });
  await framework.init();

  const positiveCommentEn = "Great job!";
  const negativeCommentEn = "This is terrible.";
  const positiveCommentId = "Kerja bagus!";
  const negativeCommentId = "Ini buruk.";

  const processedPositiveCommentEn = await framework.processComment(positiveCommentEn);
  const processedNegativeCommentEn = await framework.processComment(negativeCommentEn);
  const processedPositiveCommentId = await framework.processComment(positiveCommentId);
  const processedNegativeCommentId = await framework.processComment(negativeCommentId);

  expect(processedPositiveCommentEn).toBe("That's great! Great job!");
  expect(processedNegativeCommentEn).toBe("Keep it up! Don't let it get you down. This is terrible.");
  expect(processedPositiveCommentId).toBe("Itu hebat! Kerja bagus!");
  expect(processedNegativeCommentId).toBe("Tetap semangat! Jangan biarkan hal itu membuatmu down. Ini buruk.");
});
```
