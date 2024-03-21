import { Header } from "./Header";
import { Footer } from "./Footer";
import TopButton from "./TopButton";

export function Layout({
  navigation,
  settings,
  withHeaderDivider,
  withProfile,
  withSignUpForm,
  children,
}) {
  return (
    <div className="text-slate-700">
      <TopButton>
        <Header
          withProfile={withProfile}
          withDivider={withHeaderDivider}
          navigation={navigation}
          settings={settings}
        />
      </TopButton>
      <main>{children}</main>
      <Footer withSignUpForm={withSignUpForm} settings={settings} />
    </div>
  );
}
