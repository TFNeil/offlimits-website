export function Footer() {
    return (
        <footer className="py-12 px-6 border-t">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-black rounded-sm"></div>
                    <span className="font-bold">OFFLIMITS AI</span>
                </div>
                <div className="text-sm text-muted-foreground text-center md:text-right">
                    © 2026 OFFLIMITS AI CORP. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
