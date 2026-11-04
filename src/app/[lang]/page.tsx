import Choix from "@/components/Choix";
import { idiomaValido, type ParamsLang } from "@/i18n/params";

export default async function Home({ params }: { params: ParamsLang }) {
  const lang = idiomaValido((await params).lang);
  return <Choix lang={lang} />;
}
