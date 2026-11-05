import './globals.css';
import { JetBrains_Mono } from 'next/font/google';
import CustomCursor from '../components/CustomCursor';
import TerminalModal from '../components/TerminalModal';
import HyprlandController from '../components/HyprlandController';
import { HyprlandProvider } from '../components/HyprlandContext';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata = {
  title: 'Abdul Malik | Portfolio',
  description: 'Portfolio of Abdul Malik, an aspiring Software Engineer & AI Developer.',
  icons: {
    icon: [
      { url: '/Favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/Favicon.svg',
    apple: '/Favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="catppuccin">
      <body className={jetbrainsMono.variable} data-theme="catppuccin">
        <HyprlandProvider>
          <CustomCursor />
          <TerminalModal />
          <HyprlandController />
          {children}
        </HyprlandProvider>
      </body>
    </html>
  );
}
