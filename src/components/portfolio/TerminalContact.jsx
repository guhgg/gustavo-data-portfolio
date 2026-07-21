import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function TerminalContact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('https://formspree.io/f/xdaqdykb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) {
        toast.success('Transmission received. Expect response within 24h.');
        setForm({ name: '', email: '', message: '' });
      } else {
        toast.error('Transmission failed. Please try again or email directly.');
      }
    } catch {
      toast.error('Transmission failed. Please try again or email directly.');
    }
    setSending(false);
  };

  const handleCopyGit = () => {
    navigator.clipboard.writeText('linkedin.com/in/gustavo-anjos-souza/');
    toast.success('LinkedIn URL copied to clipboard');
  };

  return (
    <section id="transmission" className="relative py-32 pb-44">
      <div className="absolute top-0 left-0 right-0 h-px bg-border">
        <div className="h-full w-24 bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-pulse-line" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-[10px] tracking-widest text-accent/60">04</span>
          <h2 className="font-heading font-800 text-3xl md:text-4xl tracking-tight">
            Initiate Transmission
          </h2>
          <div className="hidden md:block flex-1 h-px bg-border ml-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Terminal form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-border bg-foreground/[0.02]"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/30">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground/60 ml-2">
                transmission.yaml — contact protocol
              </span>
            </div>

            <div className="p-6 space-y-4">
              {/* YAML-style fields */}
              <div>
                <label className="font-mono text-[11px] text-primary/70 mb-1 block">
                  sender_name:
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-border/60 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder='"John Doe"'
                />
              </div>
              <div>
                <label className="font-mono text-[11px] text-primary/70 mb-1 block">
                  sender_email:
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-border/60 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder='"john@company.com"'
                />
              </div>
              <div>
                <label className="font-mono text-[11px] text-primary/70 mb-1 block">
                  message_body: |
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-border/60 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none pl-4"
                  placeholder="  Describe your data challenge..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full mt-4 py-3 bg-primary text-primary-foreground font-mono text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {sending ? '// TRANSMITTING...' : '$ SEND_TRANSMISSION →'}
              </button>
            </div>
          </motion.form>

          {/* Connection info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                Connection Protocols
              </span>
              <div className="mt-4 space-y-3">
                {[
                  { protocol: 'EMAIL', value: 'gustavo42.anjos@gmail.com' },
                  { protocol: 'LINKEDIN', value: 'linkedin.com/in/gustavo-anjos-souza/' },
                  { protocol: 'GITHUB', value: 'github.com/guhgg' },
                  { protocol: 'PHONE', value: '+55 (41) 99924-6192' },
                ].map(c => (
                  <div key={c.protocol} className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] tracking-wider text-primary/50 w-20">
                      {c.protocol}
                    </span>
                    <span className="font-mono text-sm text-foreground">
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleCopyGit}
              className="flex items-center gap-3 px-4 py-3 border border-border hover:border-primary/30 transition-colors group"
            >
              <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">
                $ copy --linkedin-profile
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/40 ml-auto">
                ⌘+C
              </span>
            </button>

            {/* Availability */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-xs text-muted-foreground">
                  Available for contract & full-time opportunities
                </span>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground/50 mt-3 leading-relaxed">
                Response time: &lt; 24 hours<br />
                Timezone: UTC-3 (Brazil)<br />
                Remote: Worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
