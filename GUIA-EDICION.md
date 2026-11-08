# Guía para editar el sitio de Aura

Esta guía es para hacer cambios sin saber programar. Casi todo lo que querrás cambiar
(textos, precios, fotos, contacto) está en tres archivos.

## Dónde está cada cosa

| Quiero cambiar... | Archivo | Busca con Ctrl+F |
| --- | --- | --- |
| WhatsApp y correo | `src/content/categorias.ts` | `enlaces` |
| Precios | `src/content/categorias.ts` | `precios` |
| Nombre y lista de cada paquete | `src/content/categorias.ts` | `function paquetes` |
| Títulos de portada de Mujer / Hombre | `src/content/categorias.ts` | `mujerEs`, `mujerEn`, `hombreEs`, `hombreEn` |
| Fotos | `src/content/categorias.ts` | `const fotos` |
| Menú, botones, preguntas frecuentes, formulario, textos generales | `src/i18n/diccionarios.ts` | el texto que ves en la página |
| Prendas y outfits de La Vitrina | `src/content/vitrina.ts` | el nombre de la prenda |

**Truco:** si no sabes dónde está un texto, cópialo de la página y búscalo en todo el
proyecto con `Ctrl+Shift+F` en tu editor.

## Regla de oro: los idiomas

El sitio está en español e inglés, y cada idioma tiene su propio texto. **Si cambias un
texto en español, cambia también el inglés.** En `diccionarios.ts` el español va primero y
el inglés después. En `categorias.ts`, lo que termina en `Es` es español y lo que termina
en `En` es inglés.

Las direcciones son:

- Español: `/mujer`, `/hombre/servicios`
- Inglés: `/en/women`, `/en/men/services`

## Cómo cambiar un texto o un precio

Cambia **solo lo que está entre comillas** y deja las comillas y la coma final.

```ts
{ usd: "$49 USD", mxn: "$990 MXN" },   // Bien: solo cambian los números
```

Los precios se escriben una sola vez y sirven para Mujer, Hombre y los dos idiomas.

## Cómo cambiar una foto

1. Guarda la foto en la carpeta `public/images/`, con un nombre sencillo sin espacios ni
   acentos (por ejemplo `mujer-portada.jpg`).
2. En `categorias.ts`, dentro de `const fotos`, apunta a ella:
   `mujerHero: "/images/mujer-portada.jpg",`
3. Cambia también su descripción (`alt`) en español y en inglés.

Procura que pese menos de 1 MB. Las fotos con personas reales deben tener su autorización.

## Ver tus cambios antes de publicarlos

En la terminal, dentro de la carpeta del proyecto:

```bash
npm run dev
```

Abre la dirección que aparece (normalmente `http://localhost:3000`). Cada vez que guardes
un archivo, la página se actualiza sola. Para apagarlo, pulsa `Ctrl+C` en la terminal.

## Publicar los cambios

El sitio publicado sale de GitHub. Hasta que no hagas estos tres pasos, tus cambios solo
existen en tu computadora:

```bash
git add .
```

```bash
git commit -m "Describe aquí lo que cambiaste"
```

```bash
git push
```

Espera unos minutos y revisa https://aurawebsite-hazel.vercel.app

## Cuando algo no funciona

| Qué ves | Qué suele pasar | Qué hacer |
| --- | --- | --- |
| Pantalla de error justo después de editar | Falta una comilla o una coma | Lee el archivo y la línea que indica el error; suele estar ahí o justo antes |
| Sigue sin funcionar y no sabes por qué | El último cambio rompió algo | Deshaz con `Ctrl+Z` en el editor, guarda y vuelve a probar |
| Error 500 en todas las páginas | La carpeta temporal `.next` se dañó | Apaga con `Ctrl+C`, borra la carpeta `.next` y vuelve a ejecutar `npm run dev` (se crea sola) |
| "Port 3000 is in use" o se abre en otro puerto | Ya hay otro servidor abierto | Usa la dirección que indique la terminal, o cierra el otro servidor |
| "Module not found" o "next no se reconoce" | Faltan piezas del proyecto | Ejecuta `npm install` |
| Una foto no se ve en el sitio publicado | La foto no se subió a GitHub | Revisa que esté en `public/images/` y repite los tres pasos de publicar |
| El cambio no aparece en el sitio publicado | Aún no se publicó | Repite los tres pasos de publicar y espera unos minutos |

Antes de publicar un cambio grande, puedes comprobar que todo está bien con este comando
(apaga primero `npm run dev`, porque los dos usan la carpeta `.next`):

```bash
npm run build
```

Si termina sin errores en rojo, se puede publicar.

## Si te atoras

Pídele ayuda a Claude contándole qué querías cambiar, qué ves en pantalla y el mensaje de
error completo. Mientras no hayas publicado, el sitio en línea no se ve afectado.
