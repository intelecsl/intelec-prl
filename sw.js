// Service worker para DGP-PRL: cachea SOLO el "cascaron" de la app (HTML/iconos/manifest)
// para que abra al instante y funcione sin conexion. Las llamadas a la IA (Anthropic),
// mapas (Geoapify/OSRM) y geocodificacion (Nominatim) SIEMPRE van a la red: nunca se
// cachean, porque son datos dinamicos.
//
// IMPORTANTE: el nombre de la cache incluye la version de la app. Cuando subas una nueva
// version (nuevo index.html con VERSION distinto), cambia tambien CACHE_VERSION aqui abajo
// para que los telefonos descarguen la version nueva en vez de quedarse con la cacheada.
var CACHE_VERSION = "dgp-prl-v3.05";
var APP_SHELL = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./apple-touch-icon.png",
  "./favicon-32.png"
];

self.addEventListener("install", function(event){
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache){
      return cache.addAll(APP_SHELL).catch(function(){
        // Si algun archivo no existe todavia (p.ej. primer despliegue parcial), no
        // bloquear la instalacion del resto.
      });
    })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_VERSION; })
            .map(function(k){ return caches.delete(k); })
      );
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(event){
  var req = event.request;
  // Solo interceptar peticiones GET del mismo origen (el cascaron de la app).
  // Todo lo demas (APIs externas, POST, etc.) pasa directo a la red sin tocar la cache.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(function(cached){
      var network = fetch(req).then(function(resp){
        if (resp && resp.ok) {
          caches.open(CACHE_VERSION).then(function(cache){ cache.put(req, resp.clone()); });
        }
        return resp;
      }).catch(function(){ return cached; });
      // Cache-first para que abra al instante; si no hay nada en cache, espera a la red.
      return cached || network;
    })
  );
});
