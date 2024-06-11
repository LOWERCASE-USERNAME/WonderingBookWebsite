interface Props {
  mainContent: React.ReactElement;
  sideContent: React.ReactElement;
  navigation: React.ReactElement;
}

export default function CommonLayoutTemplate({ mainContent, sideContent, navigation }: Props) {
  return (
    <div className="container">
      <nav className="h-12 my-6">
        {navigation}
      </nav>
      <div className="grid grid-cols-3">
        <section className="w-full col-span-2">
          {mainContent}
        </section>
        <aside className="w-full col-start-3">
          {sideContent}
        </aside>
      </div>
    </div>
  );
}
