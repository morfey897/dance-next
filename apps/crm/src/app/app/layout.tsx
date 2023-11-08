import Header from '@/views/Header'
import Aside from '@/views/Aside';

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode,
  modal: React.ReactNode;
}) {
  return (<>
    <Header />
    <main className='flex w-full'>
      <Aside />
      <div className='container px-6 py-4 mx-auto'>
        {children}
      </div>
      {modal}
    </main>
  </>)
}
