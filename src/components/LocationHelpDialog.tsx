import { motion, AnimatePresence } from "framer-motion";
import { X, Chrome, Compass } from "lucide-react";
import { useT } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
};

/** Small modal with step-by-step instructions to re-enable browser geolocation. */
export function LocationHelpDialog({ open, onClose }: Props) {
  const t = useT();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="loc-help-title"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-card p-6 shadow-warm"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t("close")}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 id="loc-help-title" className="font-display text-xl font-bold">
              {t("locHelpTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("locOffHelp")}
            </p>

            <section className="mt-5 rounded-2xl border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-2 font-bold">
                <Chrome className="h-4 w-4 text-primary" /> Chrome
              </div>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>{t("locHelpChrome")}</li>
                <li>{t("locHelpChrome2")}</li>
                <li>{t("locHelpChrome3")}</li>
                <li>{t("locHelpReload")}</li>
              </ol>
            </section>

            <section className="mt-3 rounded-2xl border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-2 font-bold">
                <Compass className="h-4 w-4 text-primary" /> Safari / Android
              </div>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>{t("locHelpSafari")}</li>
                <li>{t("locHelpAndroid")}</li>
                <li>{t("locHelpReload")}</li>
              </ol>
            </section>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-2xl bg-gradient-warm px-5 py-3 text-sm font-bold text-primary-foreground shadow-warm active:scale-[0.98]"
            >
              {t("continue")}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
