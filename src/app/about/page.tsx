import AboutContainer from "./_components/about.container";

export default function AboutPage() {
  const companyInfo = {
    name: "Product Management App",
    description:
      "Product Management App adalah platform yang membantu tim dan individu dalam mengelola produk secara efisien, mulai dari perencanaan, pengembangan, hingga monitoring performa produk. Kami berfokus pada kemudahan penggunaan, produktivitas, dan kolaborasi yang lebih baik.",
    address:
      "Bogor, Jawa Barat, Indonesia",
    phone: "087845352397",
    email: "faukirijatul42@gmail.com",
    youtubeEmbedUrl: "https://www.youtube.com/embed/1H2tqKyfhXc",
  };

  return <AboutContainer companyInfo={companyInfo} />;
}

export const metadata = {
  title: "Tentang Kami - Product Management App",
  description:
    "Pelajari lebih lanjut tentang Product Management App, visi, misi, dan cara menghubungi kami.",
};
