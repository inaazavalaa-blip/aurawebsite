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
| Las 5 áreas de El Método Aura (textos, fotos y ejemplos) | `src/content/categorias.ts` | `areas:` |
| Textos de La Esencia Aura (filosofía, valores, visión) | `src/i18n/diccionarios.ts` | `esencia:` |
| Prendas de los looks de ejemplo ("Una prenda, tres looks") | `src/content/vitrina.ts` | el nombre de la prenda |

**Truco:** si no sabes dónde está un texto, cópialo de la página y búscalo en todo el
proyecto con `Ctrl+Shift+F` en tu editor.

## Regla de oro: los idiomas

El sitio está en español e inglés, y cada idioma tiene su propio texto. **Si cambias un
texto en español, cambia también el inglés.** En `diccionarios.ts` el español va primero y
el inglés después. En `categorias.ts`, lo que termina en `Es` es español y lo que termina
en `En` es inglés.

Las direcciones son:

- Español: `/mujer`, `/mujer/servicios`, `/mujer/metodo`, `/mujer/esencia`, `/mujer/contratar`
- Inglés: `/en/women`, `/en/women/services`, `/en/women/method`, `/en/women/essence`, `/en/women/book`

(Igual para Hombre: `/hombre/...` y `/en/men/...`.) Las direcciones antiguas (Vitrina,
Transformación, Maison y Reserva) redirigen solas a su sección nueva.

En El Método Aura puedes enlazar un área concreta: `/mujer/metodo?area=color`
(`color`, `rostro`, `silueta`, `armario` o `estilo`). Las fotos de las áreas son ilustrativas;
si un día usas fotos de clientes reales, pide su autorización por escrito.

## Cómo cambiar un texto o un precio

En los textos, cambia **solo lo que está entre comillas** y deja las comillas y la coma final.

Los precios van sin comillas ni símbolos, solo el número:

```ts
{ id: "vip", usd: 280, mxn: 5500 },   // Bien: solo cambian los números
```

Los precios se escriben una sola vez y sirven para Mujer, Hombre, los dos idiomas **y lo
que cobra Stripe**. Si cambias un precio aquí, el pago en línea cobra el precio nuevo.

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

## Panel de reservas y clientes

El panel está en `/admin`. Cada formulario de reserva se guarda ahí y además abre WhatsApp.
En cada reserva puedes cambiar el estado y escribir notas internas. La pestaña Clientes las
agrupa por teléfono. El botón **ES / EN** de arriba cambia el idioma del panel y lo recuerda.
Sus textos están en `src/app/admin/textos.ts`.

**Configuración inicial (solo una vez):**

1. En Supabase, abre **SQL Editor**, pega el contenido de
   `supabase/migrations/20261108000000_reservas.sql` y ejecútalo.
2. En **Authentication > Users**, crea tu usuario con correo y contraseña.
3. En **Authentication > Sign In / Providers**, desactiva el registro de usuarios nuevos.
4. En **SQL Editor**, autoriza tu cuenta (cambia el correo por el tuyo):

   ```sql
   insert into public.administradores (user_id)
   select id from auth.users where email = 'tu@correo.com';
   ```

5. En **Project Settings > API** copia la URL y la clave pública (`anon` o `publishable`).
   **Nunca uses la clave `service_role` o `secret`**.
6. Para probar en tu computadora, crea un archivo `.env.local` en la carpeta del proyecto.
   Para el sitio publicado, agrega lo mismo en Vercel, en **Settings > Environment
   Variables**, y vuelve a publicar:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=TU-CLAVE-PUBLICA
   ```

**Aviso de privacidad:** está en `src/app/[lang]/privacidad/page.tsx`. Cuando tengas el
domicilio postal, agrégalo ahí (en español y en inglés), y pide a un profesional que revise
el aviso.

| Qué ves en el panel | Qué hacer |
| --- | --- |
| "Aún no está conectado a Supabase" | Faltan las claves del paso 6 |
| "No se pudieron cargar las reservas" | Falta ejecutar el paso 1 |
| "Esta cuenta no tiene permiso" | Falta el paso 4 |
| Llega el WhatsApp, pero no aparece en el panel | Revisa los pasos 1 y 6 |

## Si te atoras

Pídele ayuda a Claude contándole qué querías cambiar, qué ves en pantalla y el mensaje de
error completo. Mientras no hayas publicado, el sitio en línea no se ve afectado.
