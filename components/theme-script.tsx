/**
 * Script inline executado antes da primeira pintura, evitando flash de tema.
 *
 * O SSR ja renderiza <html class="dark"> (dark e o padrao do site), entao este
 * script so precisa REMOVER a classe quando o usuario escolheu o tema claro.
 * Por rodar sincronamente no <head>, nada e pintado com o tema errado.
 */
const script = `(function(){try{var t=localStorage.getItem("theme");var d=document.documentElement;if(t==="light"){d.classList.remove("dark");d.style.colorScheme="light"}else{d.classList.add("dark");d.style.colorScheme="dark"}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
