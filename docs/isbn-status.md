# Estado de los ISBN

Revisión hecha contra el catálogo público de Stanford Publishing
(secundaria y bachillerato). No se inventó ningún ISBN: cuando el dato oficial
no es utilizable, la interfaz muestra `Por confirmar`.

| Estado | Títulos |
|---|---|
| Verificado (formato y dígito verificador correctos) | 39 |
| En trámite (así lo indica la fuente oficial) | 3 |
| Por confirmar | 32 |
| **Total** | **74** |

## En trámite según la fuente oficial

| Título | id |
|---|---|
| Laboratorio de Investigación | `labinv` |
| Gestión e Innovación Turística | `tur-m2s1` |
| Inteligencia de Negocios | `bi-m2s1` |

## Por confirmar

El valor de la columna "dato publicado" es lo que aparece hoy en el sitio
oficial. No se muestra en la interfaz porque no supera la validación.

| Título | id | Dato publicado | Motivo |
|---|---|---|---|
| Humanidades I | `humI` | 978-123-4567-89-7 | Marcador de posición evidente (123-456…) en la fuente oficial |
| Pensamiento Matemático I | `pmI` | 978-607-9760-11-0 | Dígito verificador incorrecto en la fuente oficial |
| Temas Selectos de Matemáticas I | `tsm1bg` | 978-607-2662-93-7 | Dígito verificador incorrecto en la fuente oficial |
| Comercio Internacional y Aduanas | `cia-m1s1` | 978-607-2662-71-8 | Dígito verificador incorrecto en la fuente oficial |
| Matemáticas I | `sec-mat1` | 978-123-45678-88-3 | Marcador de posición evidente (123-456…) en la fuente oficial |
| Matemáticas II | `sec-mat2` | 978-123-4567-88-0 | Marcador de posición evidente (123-456…) en la fuente oficial |
| Matemáticas III | `sec-mat3` | 978-123-4567-89-7 | Marcador de posición evidente (123-456…) en la fuente oficial |
| Español I | `sec-esp1` | 971-607-1973-84-4 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Español II | `sec-esp2` | 971-607-1973-82-1 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Español III | `sec-esp3` | 971-607-1973-81-1 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Ciencias I | `sec-cien1` | 971-607-1973-84-2 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Ciencias II | `sec-cien2` | 971-607-1973-88-4 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Ciencias III | `sec-cien3` | 971-607-1973-93-1 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Historia I | `sec-hist1` | 971-608-7482-19-7 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Historia II | `sec-hist2` | 971-607-1973-83-1 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Historia III | `sec-hist3` | 971-607-1973-96-2 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Formación Cívica y Ética I | `sec-fce1` | 971-607-1973-97-7 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Formación Cívica y Ética II | `sec-fce2` | 971-607-1973-97-2 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Formación Cívica y Ética III | `sec-fce3` | 971-697-1973-97-1 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Comprensión Lectora I | `sec-cl1` | 971-607-1973-95-2 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Comprensión Lectora II | `sec-cl2` | 971-608-7482-13-3 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Comprensión Lectora III | `sec-cl3` | 971-608-7482-13-2 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Artes I | `sec-artes1` | 971-608-7482-16-7 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Artes II | `sec-artes2` | 971-607-1973-95-3 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Artes III | `sec-artes3` | 971-608-7482-12-3 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Educación Socioemocional y Tutoría I | `sec-tyes1` | 971-607-1973-94-2 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Educación Socioemocional y Tutoría II | `sec-tyes2` | 971-607-1973-95-3 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Educación Socioemocional y Tutoría III | `sec-tyes3` | 971-607-1973-96-2 | Prefijo inválido en la fuente oficial (971- no es un prefijo ISBN-13) |
| Guía Práctica para Ingreso a Bachillerato | `sec-guia-bach` | — | La fuente oficial no publica ISBN |
| Xtreme Plus 1 | `sec-xtremeplus1` | — | La fuente oficial no publica ISBN |
| Xtreme Plus 2 | `sec-xtremeplus2` | — | La fuente oficial no publica ISBN |
| Xtreme Plus 3 | `sec-xtremeplus3` | — | La fuente oficial no publica ISBN |

## Cómo cerrar la lista

Pedir a Stanford Publishing el archivo de ISBN por título. Al recibirlo, editar
`src/data/books.ts` y `src/data/books-secundaria.ts`: colocar el número en
`isbn` y cambiar `isbnStatus` a `"verificado"`. La interfaz se actualiza sola.
