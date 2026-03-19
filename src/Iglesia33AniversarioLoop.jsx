import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, Church, Star } from "lucide-react";

const SCENE_DURATION = 8000;
const scenePhotos = {
  welcome: "/fotos/bienvenidos-iglesia.jpg",
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
          Centro Evangelistico "Peniel"
        </div>
        <p className="mt-4 max-w-xl text-sm text-white/75 md:text-base">{caption}</p>
      </div>
    </motion.div>
  );
}

function SceneWelcome() {
  return (
    <SceneShell>
      <div className="grid items-center gap-8 md:grid-cols-[0.88fr_1.12fr]">
        <div className="order-2 text-center text-white md:order-1 md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-amber-200"
          >
            <Sparkles className="h-4 w-4" /> Bienvenidos
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="text-5xl font-semibold leading-[0.95] md:text-8xl"
          >
            <span className="block text-white">Bienvenidos</span>
            <span className="mt-3 block text-2xl font-medium text-white/75 md:text-4xl">
              a celebrar
            </span>
            <span className="mt-3 block text-amber-300">33 años</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9 }}
            className="mt-6 max-w-2xl text-lg text-white/80 md:text-2xl"
          >
            de la fidelidad de Dios en Centro Evangelistico "Peniel"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm uppercase tracking-[0.28em] text-white/80 backdrop-blur-md"
          >
            Una historia viva de fe, gracia y servicio
          </motion.div>
        </div>

        <ScenePhoto
          className="order-1 min-h-[420px] md:order-2"
          imageClassName="md:scale-[1.03]"
          src={scenePhotos.welcome}
          alt='Foto actual de Centro Evangelistico "Peniel"'
        />
      </div>
    </SceneShell>
  );
}

function SceneOrigin() {
  return (
    <SceneShell>
      <div className="text-center text-white">
        <motion.div
          className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10 shadow-2xl shadow-amber-400/10"
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="h-10 w-10 text-amber-300" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl font-semibold md:text-6xl"
        >
          Todo comenzó con una promesa
        </motion.h2>
      </div>
    </SceneShell>
  );
}

function SceneProcess({ cycle }) {
  const line = randomFrom(
    [
      "Dios ha sido fiel en cada etapa",
      "Hemos visto su mano a través de los años",
      "Su gracia nos ha sostenido generación tras generación",
    ],
    cycle
  );

  return (
    <SceneShell>
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
          <div className="space-y-4 text-white">
            <div className="text-sm uppercase tracking-[0.3em] text-amber-200">Proceso</div>
            <h2 className="text-3xl font-semibold md:text-5xl">{line}</h2>
          </div>
        </div>

        <motion.div
          className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-md"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="space-y-4 text-white/85">
            <div className="h-3 w-24 rounded-full bg-amber-300/60" />
            <div className="h-3 w-40 rounded-full bg-white/25" />
            <div className="h-3 w-32 rounded-full bg-white/25" />
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="h-24 rounded-2xl bg-white/10" />
              <div className="h-24 rounded-2xl bg-white/10" />
              <div className="h-24 rounded-2xl bg-white/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
}

function ScenePresent({ cycle }) {
  return (
    <SceneShell>
      <div className="text-center text-white">
        <motion.div
          className="mx-auto mb-8 h-40 w-40 rounded-full bg-amber-200/10 blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <h2 className="text-4xl font-semibold md:text-6xl">Hoy seguimos viendo su fidelidad</h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80 md:text-2xl">
          {randomFrom(verses, cycle)}
        </p>
      </div>
    </SceneShell>
  );
}

function ScenePurpose() {
  return (
    <SceneShell>
      <div className="text-center text-white">
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

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [0.9, 1.04, 1] }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 bg-gradient-to-r from-amber-200 via-white to-amber-300 bg-clip-text text-5xl font-bold uppercase tracking-[0.18em] text-transparent drop-shadow md:text-8xl"
        >
          Salvos para servir
        </motion.h2>
      </div>
    </SceneShell>
  );
}

function SceneTestimonies({ cycle }) {
  const item = randomFrom(testimonyItems, cycle);

  return (
    <SceneShell>
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-center text-white shadow-2xl shadow-black/20 backdrop-blur-md md:p-10">
        <div className="mb-4 text-sm uppercase tracking-[0.35em] text-amber-200">Testimonios</div>
        <h2 className="text-3xl font-semibold md:text-6xl">{item.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80 md:text-2xl">{item.subtitle}</p>
        <div className="mt-8 inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-5 py-3 text-sm uppercase tracking-[0.25em] text-amber-200 md:text-base">
          {item.highlight}
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
        <p className="mt-8 text-xl text-white/80 md:text-3xl">Centro Evangelistico "Peniel"</p>
        <p className="mt-3 text-sm uppercase tracking-[0.35em] text-amber-200 md:text-base">33 años de fidelidad</p>
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



