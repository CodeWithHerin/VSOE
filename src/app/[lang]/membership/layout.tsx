export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const meta: any = {"en":{"t":"The 1920 Club Membership","d":"Join the exclusive 1920 Club and unlock extraordinary privileges and priority access."},"fr":{"t":"Le Club 1920","d":"Rejoignez le Club 1920 exclusif et débloquez des privilèges extraordinaires."},"it":{"t":"Il Club 1920","d":"Unisciti all esclusivo Club 1920 e sblocca privilegi straordinari."},"de":{"t":"Der 1920 Club","d":"Treten Sie dem exklusiven 1920 Club bei und genießen Sie außergewöhnliche Privilegien."}};
    const current = meta[lang as keyof typeof meta] || meta.en;
    
    return {
        title: current.t + ' | Venice Simplon-Orient-Express',
        description: current.d,
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
