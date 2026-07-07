# DGP-PRL - Intelec S.L.

Aplicacion interna para generar Documentos de Gestion Preventiva (DGP):
identificacion y evaluacion de riesgos laborales, catalogo de medidas
preventivas, y generacion del documento final en PDF/Word, segun la
Ley 31/1995 LPRL y el RD 39/1997 RSP.

Esta version esta pensada para publicarse como pestana (tab) de
Microsoft Teams, alojando este repositorio con **GitHub Pages**.

## Contenido del repositorio

- `index.html` — la aplicacion completa (autocontenida, sin dependencias
  externas salvo el SDK de Teams, que se ignora si se abre fuera de Teams).
- `config.html` — pagina de configuracion usada por Teams cuando se
  anade la app como pestana de canal/equipo.

## Como activar GitHub Pages

1. En este repositorio, ve a **Settings > Pages**.
2. En "Build and deployment" > "Source", selecciona **Deploy from a branch**.
3. Elige la rama `main` y la carpeta `/ (root)`.
4. Guarda. GitHub tardara uno o dos minutos en publicar el sitio.
5. La URL resultante sera:
   - `https://intelecsl.github.io/intelec-prl/index.html`
   - `https://intelecsl.github.io/intelec-prl/config.html`

Si el repositorio es privado, comprueba que vuestro plan de GitHub
permite publicar Pages desde repos privados (GitHub Pro, Team o
Enterprise Cloud). En ese caso, la pagina publicada sigue siendo
accesible por URL directa aunque el repo sea privado (Pages no exige
inicio de sesion salvo que se configure explicitamente la visibilidad
privada de Pages, disponible en Enterprise Cloud).

## Probar la app sin Teams

Simplemente abre `https://intelecsl.github.io/intelec-prl/index.html`
en el navegador una vez publicado el sitio: la aplicacion debe
funcionar igual que al abrir el .html localmente.

## Clave de API

Las funciones con IA (autocompletar desde documento, buscar centros
sanitarios, identificar riesgos) requieren que cada persona configure
su propia clave de API de Anthropic desde el boton "Configurar API"
dentro de la app. La clave se queda solo en el navegador de cada
usuario, nunca se guarda en este repositorio ni se comparte.
