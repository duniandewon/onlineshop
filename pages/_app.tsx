import type { AppProps } from 'next/app';
import { wrapper } from '../store';

import '../styles/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
