import { SITE_CONFIG } from "@/lib/constants";
import { Save } from "lucide-react";

export const metadata = {
  title: "Settings — Admin — Telal Development",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-white">Settings</h1>
        <button className="btn-gold gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* General */}
      <section className="bg-black-deep border border-black-border rounded-sm p-6">
        <h2 className="font-display text-lg text-white mb-5">General</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Site Name
            </label>
            <input
              type="text"
              className="input-luxury"
              defaultValue={SITE_CONFIG.name}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Tagline
            </label>
            <input
              type="text"
              className="input-luxury"
              defaultValue={SITE_CONFIG.tagline}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Description
            </label>
            <textarea
              className="input-luxury min-h-[100px] resize-y"
              defaultValue={SITE_CONFIG.description}
            />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-black-deep border border-black-border rounded-sm p-6">
        <h2 className="font-display text-lg text-white mb-5">Contact Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
                Email
              </label>
              <input
                type="email"
                className="input-luxury"
                defaultValue={SITE_CONFIG.email}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
                Phone
              </label>
              <input
                type="tel"
                className="input-luxury"
                defaultValue={SITE_CONFIG.phone}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              WhatsApp
            </label>
            <input
              type="tel"
              className="input-luxury"
              defaultValue={SITE_CONFIG.whatsapp}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Address
            </label>
            <input
              type="text"
              className="input-luxury"
              defaultValue={SITE_CONFIG.address}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Office Hours
            </label>
            <input
              type="text"
              className="input-luxury"
              defaultValue={SITE_CONFIG.officeHours}
            />
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="bg-black-deep border border-black-border rounded-sm p-6">
        <h2 className="font-display text-lg text-white mb-5">Social Links</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Instagram
            </label>
            <input
              type="url"
              className="input-luxury"
              defaultValue={SITE_CONFIG.social.instagram}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              className="input-luxury"
              defaultValue={SITE_CONFIG.social.linkedin}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Twitter / X
            </label>
            <input
              type="url"
              className="input-luxury"
              defaultValue={SITE_CONFIG.social.twitter}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              YouTube
            </label>
            <input
              type="url"
              className="input-luxury"
              defaultValue={SITE_CONFIG.social.youtube}
            />
          </div>
        </div>
      </section>

      {/* SEO Defaults */}
      <section className="bg-black-deep border border-black-border rounded-sm p-6">
        <h2 className="font-display text-lg text-white mb-5">SEO Defaults</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Default Meta Title
            </label>
            <input
              type="text"
              className="input-luxury"
              defaultValue={`${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Default Meta Description
            </label>
            <textarea
              className="input-luxury min-h-[80px] resize-y"
              defaultValue={SITE_CONFIG.description}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-light mb-2">
              Canonical URL
            </label>
            <input
              type="url"
              className="input-luxury"
              defaultValue={SITE_CONFIG.url}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
