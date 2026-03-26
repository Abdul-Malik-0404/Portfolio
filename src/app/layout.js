import './globals.css';
import { Inter, Outfit } from 'next/font/google';
import CustomCursor from '../components/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata = {
  title: 'Abdul Malik | Portfolio',
  description: 'Portfolio of Abdul Malik, an aspiring Software Engineer & AI Developer.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
