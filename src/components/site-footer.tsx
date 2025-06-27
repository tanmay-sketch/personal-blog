import { MailIcon } from "lucide-react";
import { Icons } from "./icons";
import { siteConfig } from "../../config/site";

export function SiteFooter() {
    return (
        <footer>
            <div className="mb-6 mt-14 flex flex-col items-center">
                <div className="mb-3 flex space-x-4">
                    <a target="_blank" rel="noreferrer" href="mailto:grandhisiri.tanmay@yahoo.com">
                        <span className="sr-only">Email</span>
                        <MailIcon className="h-6 w-6" />
                    </a>
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/tanmay-grandhi-siri/">
                        <span className="sr-only">LinkedIn</span>
                        <Icons.linkedin className="h-6 w-6" />
                    </a>
                    <a target="_blank" rel="noreferrer" href="https://github.com/tanmay-sketch">
                        <span className="sr-only">GitHub</span>
                        <Icons.gitHub className="h-6 w-6" />
                    </a>
                </div>
                <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
                    <a href={siteConfig.links.personalSite} target="_blank">
                        &copy; {siteConfig.author}
                    </a>

                </div>
            </div>
        </footer>
    )
}