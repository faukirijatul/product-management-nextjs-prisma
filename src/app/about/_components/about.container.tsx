"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

type CompanyInfo = {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  youtubeEmbedUrl: string;
};

type Props = {
  companyInfo: CompanyInfo;
};

export default function AboutContainer({ companyInfo }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Tentang {companyInfo.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Platform untuk membantu Anda mengelola produk secara terstruktur,
            efisien, dan mudah digunakan.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-text">Siapa Kami?</h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              {companyInfo.description}
            </p>
            <p className="text-gray-700 leading-relaxed">
              Platform ini dirancang untuk membantu pengelolaan data produk,
              kategori, stok, harga, dan diskon dalam satu sistem terpusat yang
              mudah dioperasikan.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-text">Hubungi Kami</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-text mb-1">Alamat</h3>
                  <p className="text-gray-700">{companyInfo.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-text mb-1">
                    Telepon / WhatsApp
                  </h3>
                  <a
                    href={`https://wa.me/62${companyInfo.phone.substring(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-text mb-1">Email</h3>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-primary hover:underline"
                  >
                    {companyInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <div className="p-8 md:p-10 text-center border-b border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">
              Kenali Platform Lebih Dekat
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tonton video singkat untuk memahami fitur, alur kerja, dan manfaat
              penggunaan platform ini dalam pengelolaan produk.
            </p>
          </div>

          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={companyInfo.youtubeEmbedUrl}
              title="Video Profil"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Butuh bantuan atau informasi lebih lanjut? Kami siap membantu Anda.
          </p>
          <a
            href={`mailto:${companyInfo.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primaryDark transition shadow-md"
          >
            Kirim Email ke Kami
          </a>
        </div>
      </div>
    </div>
  );
}
