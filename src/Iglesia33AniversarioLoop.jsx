import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, Church, Star } from "lucide-react";

const SCENE_DURATION = 8000;
const CHURCH_NAME = 'CENTRO EVANGELISTICO "PENIEL"';

function assetUrl(path) {
  return new URL(path, import.meta.env.BASE_URL).toString();
}

const scenePhotos = {
  welcome: assetUrl('fotos/bienvenidos-iglesia.jpg'),
  origin: [
    assetUrl('fotos/origen-1.jpg'),
    assetUrl('fotos/origen-2.jpg'),
    assetUrl('fotos/origen-3.jpg'),
  ],
  process: [
    assetUrl('fotos/proceso-1.jpg'),
    assetUrl('fotos/proceso-2.jpg'),
    assetUrl('fotos/proceso-3.jpg'),
    assetUrl('fotos/proceso-4.jpg'),
    assetUrl('fotos/proceso-5.jpg'),
  ],
  present: [
    assetUrl('fotos/presente-1.jpg'),
    assetUrl('fotos/presente-2.jpg'),
    assetUrl('fotos/presente-3.jpg'),
  ],
  purpose: [
    assetUrl('fotos/proposito-1.jpg'),
    assetUrl('fotos/proposito-2.jpg'),
    assetUrl('fotos/proposito-3.jpg'),
  ],
};

const testimonyItems = [
  {
    title: "Hna. Pastora Tec",
    subtitle: "Dios nos ha ayudado en las pruebas y en las victorias",
    highlight: "Salvos para servir",
  },
  {
    title: "Pbro. Manuel Chan",
    subtitle: "33 años viendo la fidelidad de Dios",
    highlight: "Llamadas a servir",
  },
  {
    title: "Pbro. Lizzie Haas",
    subtitle: "Firmes en fe, amor y servicio",
    highlight: "Sirviendo con propósito",
  },
  {
    title: "Hno. Pedro Pat",
    subtitle: "Hemos visto la misericordia del Dios en cada etapa",
    highlight: "Hasta aquí nos ayudó Jehová",
  },
];

const verses = [
  "Hasta aquí nos ayudó Jehová",
  "Grandes cosas ha hecho Jehová con nosotros",
  "Jesucristo es el mismo ayer, hoy y por los siglos",
];

function randomFrom(items, index) {
  return items[index % items.length];
}

function pickTwoFrom(items, index) {
  const first = items[index % items.length];
  const second = items[(index + 1) % items.length];
  return [first, second];
}

function useSceneLoop(totalScenes, duration) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSceneIndex((prev) => {
        const next = (prev + 1) % totalScenes;
        if (next === 0) setCycle((currentCycle) => currentCycle + 1);
        return next;
      });
    }, duration);

    return () => window.clearInterval(id);
  }, [totalScenes, duration]);

  return { sceneIndex, cycle };
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_35%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.22),transparent_40%),linear-gradient(180deg,#020617_0%,#0f172a_45%,#020617_100%)]" />

      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/30 blur-sm"
          style={{
            width: `${8 + (i % 4) * 8}px`,
            height: `${8 + (i % 4) * 8}px`,
            left: `${(i * 7) % 100}%`,
            top: `${(i * 11) % 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, i % 2 === 0 ? 8 : -8, 0],
            opacity: [0.15, 0.55, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 6 + (i % 5),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute inset-x-0 top-0 mx-auto h-72 w-72 rounded-full bg-amber-300/10 blur-3xl"
        animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function FixedBrand() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-6 py-5 text-white/80 md:px-10">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
        <Church className="h-4 w-4 text-amber-300" />
        <span className="text-xs uppercase tracking-[0.25em] md:text-sm">33 años de fundación</span>
      </div>

      <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] backdrop-blur-md md:block">
        Salvos para servir
      </div>
    </div>
  );
}

function SceneShell({ children }) {
  return (
    <motion.div
      className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20"
      initial={{ opacity: 0, scale: 0.985, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.015, filter: "blur(10px)" }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </motion.div>
  );
}

function ScenePhoto({ src, alt, caption, className = "", imageClassName = "" }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={`relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.08] p-6 text-left backdrop-blur-md ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.35))]" />
        <div className="relative z-10 flex min-h-[340px] flex-col justify-end">
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-amber-200">
            <Church className="h-4 w-4" />
            Foto actual
          </div>
          <h3 className="max-w-md text-2xl font-semibold text-white md:text-3xl">
            Subí una foto en <span className="text-amber-300">/public/fotos/bienvenidos-iglesia.jpg</span>
          </h3>
          <p className="mt-4 max-w-lg text-sm text-white/75 md:text-base">{caption}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.9 }}
      className={`relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.08] shadow-2xl shadow-black/30 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_28%)]" />
      <img
        src={src}
        alt={alt}
        className={`h-[420px] w-full object-cover md:h-[620px] ${imageClassName}`}
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-x-0 top-0 flex justify-end p-4 md:p-6">
        <div className="rounded-full border border-white/15 bg-slate-950/35 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/85 backdrop-blur-md">Foto actual</div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/40 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/85 backdrop-blur-md">
          <Church className="h-4 w-4 text-amber-300" />
          {CHURCH_NAME}
        </div>
        <p className="mt-4 max-w-xl text-sm text-white/75 md:text-base">{caption}</p>
      </div>
    </motion.div>
  );
}

function WelcomeHero({ src, alt }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.08] p-8 shadow-2xl shadow-black/30 backdrop-blur-md md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.8))]" />
        <div className="relative z-10 grid min-h-[70vh] content-between gap-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-amber-200">
              <Sparkles className="h-4 w-4" /> Bienvenidos
            </div>
            <div className="rounded-full border border-white/15 bg-slate-950/35 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/85 backdrop-blur-md">
              Foto actual
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="text-5xl font-semibold leading-[0.92] md:text-8xl"
            >
              Bienvenidos
              <span className="mt-3 block text-2xl font-medium text-white/75 md:text-4xl">
                a celebrar
              </span>
              <span className="mt-3 block text-amber-300">33 años</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.9 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-2xl"
            >
              de la fidelidad de Dios en
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.47, duration: 0.95 }}
              className="mx-auto mt-4 max-w-4xl bg-gradient-to-r from-amber-200 via-white to-amber-300 bg-clip-text text-2xl font-black uppercase tracking-[0.16em] text-transparent drop-shadow-[0_0_18px_rgba(251,191,36,0.26)] md:text-5xl"
            >
              {CHURCH_NAME}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.9 }}
              className="mx-auto mt-6 max-w-xl text-sm text-white/70 md:text-base"
            >
              Subí una foto en <span className="text-amber-300">/public/fotos/bienvenidos-iglesia.jpg</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm uppercase tracking-[0.28em] text-white/80 backdrop-blur-md">
              Una historia viva de fe, gracia y servicio
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/40 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/85 backdrop-blur-md">
              <Church className="h-4 w-4 text-amber-300" />
              Centro Evangelistico "Peniel"
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/30">
      <motion.img
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src={src}
        alt={alt}
        className="h-[72vh] min-h-[520px] w-full object-cover"
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.18)_0%,rgba(2,6,23,0.32)_22%,rgba(2,6,23,0.62)_55%,rgba(2,6,23,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.24),transparent_24%)]" />

      <div className="absolute inset-x-0 top-0 flex flex-wrap items-center justify-center gap-4 p-5 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-amber-200 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4" /> Bienvenidos
        </motion.div>

        <div className="rounded-full border border-white/15 bg-slate-950/35 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/85 backdrop-blur-md">
          Foto actual
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 text-center md:p-10">
        <div className="mx-auto max-w-4xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9 }}
            className="text-5xl font-semibold leading-[0.9] md:text-8xl"
          >
            Bienvenidos
            <span className="mt-3 block text-2xl font-medium text-white/75 md:text-4xl">
              a celebrar
            </span>
            <span className="mt-3 block text-amber-300">33 años</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.9 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/85 md:text-2xl"
          >
            de la fidelidad de Dios en
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.95 }}
            className="mx-auto mt-4 max-w-4xl bg-gradient-to-r from-amber-200 via-white to-amber-300 bg-clip-text text-2xl font-black uppercase tracking-[0.16em] text-transparent drop-shadow-[0_0_18px_rgba(251,191,36,0.26)] md:text-5xl"
          >
            {CHURCH_NAME}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.9 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.08] px-5 py-3 text-sm uppercase tracking-[0.28em] text-white/85 backdrop-blur-md">
              Una historia viva de fe, gracia y servicio
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/40 px-3 py-2 text-xs uppercase tracking-[0.28em] text-white/85 backdrop-blur-md">
              <Church className="h-4 w-4 text-amber-300" />
              Centro Evangelistico "Peniel"
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SceneWelcome() {
  return (
    <SceneShell>
      <WelcomeHero
        src={scenePhotos.welcome}
        alt='Foto actual de Centro Evangelistico "Peniel"'
      />
    </SceneShell>
  );
}

function SceneOrigin() {
  const [erroredImages, setErroredImages] = useState({});

  const handleImageError = (index) => {
    setErroredImages((current) => ({ ...current, [index]: true }));
  };

  return (
    <SceneShell>
      <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
        <div className="text-center text-white md:text-left">
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-amber-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Star className="h-4 w-4" /> Nuestros inicios
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9 }}
            className="text-4xl font-semibold leading-tight md:text-6xl"
          >
            Todo comenzó
            <span className="mt-2 block text-amber-300">con una promesa</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9 }}
            className="mt-6 max-w-2xl text-lg text-white/78 md:text-2xl"
          >
            Aquí podemos mostrar cómo inició la iglesia, recordando los primeros pasos,
            los comienzos sencillos y la fidelidad de Dios desde el principio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm uppercase tracking-[0.28em] text-white/80 backdrop-blur-md"
          >
            Memorias del comienzo
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr] md:grid-rows-2">
          {scenePhotos.origin.map((src, index) => {
            const isLarge = index === 0;
            const hasError = !!erroredImages[index];

            return (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.12, duration: 0.85 }}
                className={[
                  "relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/25",
                  isLarge ? "md:row-span-2" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {hasError ? (
                  <div
                    className={[
                      "relative flex items-end p-6",
                      isLarge ? "min-h-[430px]" : "min-h-[205px]",
                    ].join(" ")}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.65))]" />
                    <div className="relative z-10">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-200">
                        <Church className="h-4 w-4" /> Foto {index + 1}
                      </div>
                      <p className="max-w-sm text-base text-white/85 md:text-lg">
                        Subí <span className="text-amber-300">/public/fotos/origen-{index + 1}.jpg</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={src}
                      alt={"Foto histórica " + (index + 1) + " del inicio de la iglesia"}
                      className={[
                        "w-full object-cover",
                        isLarge ? "h-[430px]" : "h-[205px]",
                      ].join(" ")}
                      onError={() => handleImageError(index)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/35 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/85 backdrop-blur-md">
                      Inicio {index + 1}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
}

function SceneProcess({ cycle }) {
  const [erroredImages, setErroredImages] = useState({});
  const line = randomFrom(
    [
      "Dios ha sido fiel en cada etapa",
      "Hemos visto su mano a través de los años",
      "Su gracia nos ha sostenido generación tras generación",
    ],
    cycle
  );

  const handleImageError = (index) => {
    setErroredImages((current) => ({ ...current, [index]: true }));
  };

  return (
    <SceneShell>
      <div className="space-y-8">
        <div className="mx-auto max-w-4xl text-center text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-amber-200">
            <Church className="h-4 w-4" /> Proceso
          </div>
          <h2 className="mt-6 text-4xl font-semibold md:text-6xl">{line}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-white/78 md:text-2xl">
            Un recorrido visual de cómo la iglesia ha ido creciendo, cambiando y avanzando
            con la ayuda de Dios a través del tiempo.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
          {scenePhotos.process.map((src, index) => {
            const hasError = !!erroredImages[index];
            const cardClass = [
              "relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/25",
              index === 0 ? "md:col-span-5 md:row-span-2" : "",
              index === 1 ? "md:col-span-4" : "",
              index === 2 ? "md:col-span-3" : "",
              index === 3 ? "md:col-span-3" : "",
              index === 4 ? "md:col-span-4" : "",
            ]
              .filter(Boolean)
              .join(" ");
            const heightClass = index === 0 ? "h-[420px] md:h-full" : "h-[200px]";
            const fallbackClass = ["relative flex items-end p-5", heightClass].join(" ");
            const imageClass = ["w-full object-cover", heightClass].join(" ");

            return (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.12 + index * 0.1, duration: 0.85 }}
                className={cardClass}
              >
                {hasError ? (
                  <div className={fallbackClass}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.65))]" />
                    <div className="relative z-10">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-200">
                        <Church className="h-4 w-4" /> Etapa {index + 1}
                      </div>
                      <p className="text-base text-white/85 md:text-lg">
                        Subí <span className="text-amber-300">/public/fotos/proceso-{index + 1}.jpg</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={src}
                      alt={"Foto del proceso de crecimiento " + (index + 1)}
                      className={imageClass}
                      onError={() => handleImageError(index)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/18 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/35 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/85 backdrop-blur-md">
                      Etapa {index + 1}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 text-center text-sm uppercase tracking-[0.28em] text-white/72">
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-md">Inicio</div>
          <div className="text-amber-300">•</div>
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-md">Crecimiento</div>
          <div className="text-amber-300">•</div>
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-md">Transformación</div>
          <div className="text-amber-300">•</div>
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-md">Fidelidad de Dios</div>
        </div>
      </div>
    </SceneShell>
  );
}

function ScenePresent({ cycle }) {
  const [erroredImages, setErroredImages] = useState({});

  const handleImageError = (index) => {
    setErroredImages((current) => ({ ...current, [index]: true }));
  };

  return (
    <SceneShell>
      <div className="space-y-8 text-white">
        <div className="text-center">
          <motion.div
            className="mx-auto mb-6 h-40 w-40 rounded-full bg-amber-200/10 blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className="text-4xl font-semibold md:text-6xl">Hoy seguimos viendo su fidelidad</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80 md:text-2xl">
            {randomFrom(verses, cycle)}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          {scenePhotos.present.map((src, index) => {
            const hasError = !!erroredImages[index];
            const isLarge = index === 0;
            const wrapperClass = [
              "relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/25",
              isLarge ? "min-h-[420px]" : "min-h-[205px]",
            ].join(" ");
            const imageClass = [
              "w-full object-cover",
              isLarge ? "h-[420px]" : "h-[205px]",
            ].join(" ");

            return (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.12, duration: 0.85 }}
                className={wrapperClass}
              >
                {hasError ? (
                  <div className={["relative flex items-end p-6", isLarge ? "h-[420px]" : "h-[205px]"].join(" ")}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.65))]" />
                    <div className="relative z-10">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-200">
                        <Church className="h-4 w-4" /> Presente {index + 1}
                      </div>
                      <p className="text-base text-white/85 md:text-lg">
                        Subí <span className="text-amber-300">/public/fotos/presente-{index + 1}.jpg</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={src}
                      alt={"Foto actual de la iglesia " + (index + 1)}
                      className={imageClass}
                      onError={() => handleImageError(index)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/18 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/35 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/85 backdrop-blur-md">
                      Presente {index + 1}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
}

function ScenePurpose() {
  const [erroredImages, setErroredImages] = useState({});

  const handleImageError = (index) => {
    setErroredImages((current) => ({ ...current, [index]: true }));
  };

  return (
    <SceneShell>
      <div className="space-y-8 text-white">
        <div className="text-center">
          <motion.div
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10"
            animate={{
              scale: [1, 1.12, 1],
              boxShadow: [
                "0 0 0px rgba(251,191,36,0)",
                "0 0 40px rgba(251,191,36,0.28)",
                "0 0 0px rgba(251,191,36,0)",
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame className="h-10 w-10 text-amber-300" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="text-lg text-white/75 md:text-2xl"
          >
            Fuimos alcanzados por gracia...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-4 text-xl text-white/85 md:text-3xl"
          >
            No solo para recibir...
          </motion.p>
        </div>

        <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            {scenePhotos.purpose.slice(0, 2).map((src, index) => {
              const hasError = !!erroredImages[index];

              return (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.14 + index * 0.1, duration: 0.85 }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/25"
                >
                  {hasError ? (
                    <div className="relative flex h-[205px] items-end p-6">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.65))]" />
                      <div className="relative z-10">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-200">
                          <Church className="h-4 w-4" /> Actividad {index + 1}
                        </div>
                        <p className="text-base text-white/85 md:text-lg">
                          Subí <span className="text-amber-300">/public/fotos/proposito-{index + 1}.jpg</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={src}
                        alt={"Foto de actividad de la iglesia " + (index + 1)}
                        className="h-[205px] w-full object-cover"
                        onError={() => handleImageError(index)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/18 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/35 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/85 backdrop-blur-md">
                        Actividad {index + 1}
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.32, duration: 0.9 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/25"
          >
            {!!erroredImages[2] ? (
              <div className="relative flex h-[420px] items-end p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.65))]" />
                <div className="relative z-10">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-200">
                    <Church className="h-4 w-4" /> Actividad 3
                  </div>
                  <p className="text-base text-white/85 md:text-lg">
                    Subí <span className="text-amber-300">/public/fotos/proposito-3.jpg</span>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={scenePhotos.purpose[2]}
                  alt="Foto de actividad principal de la iglesia"
                  className="h-[420px] w-full object-cover"
                  onError={() => handleImageError(2)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/18 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/35 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/85 backdrop-blur-md">
                  Actividad 3
                </div>
              </>
            )}
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [0.9, 1.04, 1] }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-center bg-gradient-to-r from-amber-200 via-white to-amber-300 bg-clip-text text-5xl font-bold uppercase tracking-[0.18em] text-transparent drop-shadow md:text-8xl"
        >
          Salvos para servir
        </motion.h2>
      </div>
    </SceneShell>
  );
}

function SceneTestimonies({ cycle }) {
  const items = pickTwoFrom(testimonyItems, cycle);

  return (
    <SceneShell>
      <div className="mx-auto max-w-6xl text-center text-white">
        <div className="mb-4 text-sm uppercase tracking-[0.35em] text-amber-200">Testimonios</div>
        <h2 className="text-4xl font-semibold md:text-6xl">Lo que Dios ha hecho en:</h2>
        <h2 className="text-4xl font-semibold md:text-6xl">{CHURCH_NAME}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-white/78 md:text-2xl">
          Muchas voces, muchas experiencias y una misma fidelidad de Dios obrando en la iglesia.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <motion.div
              key={item.title + index}
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.12, duration: 0.85 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-center shadow-2xl shadow-black/20 backdrop-blur-md md:p-10"
            >
              <h3 className="text-3xl font-semibold md:text-5xl">{item.title}</h3>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80 md:text-2xl">{item.subtitle}</p>
              <div className="mt-8 inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-5 py-3 text-sm uppercase tracking-[0.25em] text-amber-200 md:text-base">
                {item.highlight}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

function SceneFuture() {
  return (
    <SceneShell>
      <div className="text-center text-white">
        <motion.div
          className="mx-auto mb-8 h-px w-48 bg-gradient-to-r from-transparent via-amber-300 to-transparent"
          animate={{ width: [180, 260, 180], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <h2 className="text-4xl font-semibold md:text-6xl">Lo mejor aún está por venir</h2>
        <p className="mt-8 bg-gradient-to-r from-amber-200 via-white to-amber-300 bg-clip-text text-2xl font-black uppercase tracking-[0.16em] text-transparent drop-shadow-[0_0_18px_rgba(251,191,36,0.26)] md:text-5xl">{CHURCH_NAME}</p>
        <p className="mt-3 text-sm uppercase tracking-[0.35em] text-amber-200 md:text-base">33 años de fidelidad</p>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: [0.96, 1.03, 1] }}
          transition={{ delay: 0.35, duration: 1.1 }}
          className="mt-10"
        >
          <div className="mx-auto mb-5 h-px w-56 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <p className="text-sm uppercase tracking-[0.42em] text-white/55 md:text-base">
            Nuestra identidad
          </p>
          <h3 className="mt-4 bg-gradient-to-r from-amber-200 via-white to-amber-300 bg-clip-text text-5xl font-black uppercase tracking-[0.2em] text-transparent drop-shadow-[0_0_24px_rgba(251,191,36,0.3)] md:text-8xl">
            SALVOS PARA SERVIR
          </h3>
        </motion.div>
      </div>
    </SceneShell>
  );
}

export default function Iglesia33AniversarioLoop() {
  const scenes = useMemo(
    () => [
      SceneWelcome,
      SceneOrigin,
      SceneProcess,
      ScenePresent,
      ScenePurpose,
      SceneTestimonies,
      SceneFuture,
    ],
    []
  );

  const { sceneIndex, cycle } = useSceneLoop(scenes.length, SCENE_DURATION);
  const CurrentScene = scenes[sceneIndex];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <AnimatedBackground />
      <FixedBrand />

      <AnimatePresence mode="wait">
        <CurrentScene key={`${sceneIndex}-${cycle}`} cycle={cycle} />
      </AnimatePresence>
    </div>
  );
}






