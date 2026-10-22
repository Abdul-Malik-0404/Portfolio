import './globals.css';
import { JetBrains_Mono } from 'next/font/google';
import CustomCursor from '../components/CustomCursor';

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains-mono' 
});

export const metadata = {
  title: 'Abdul Malik | Portfolio',
  description: 'Portfolio of Abdul Malik, an aspiring Software Engineer & AI Developer.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
