'use client';

import * as React from 'react';
import Link from 'next/link';
import { MobileAuth } from '@/components/auth/mobile-auth';
import { siteConfig } from '@/config';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
	ScrollArea
} from '@elvia/ui';
import { ExternalLink } from '@elvia/ui/icons';
import { cn } from '@elvia/utils';

export function MobileNav({ className }: React.ComponentProps<'button'>) {
	const [open, setOpen] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (open) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	}, [open]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						'group relative flex h-8 w-8 flex-col gap-0 rounded-full border pe-[6px] ps-[6px] duration-200 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden',
						className
					)}
				>
					<div
						data-position="top"
						className="absolute h-[1.5px] w-[14px] translate-y-[-3.5px] bg-foreground transition-transform group-data-[state=open]:translate-y-0 group-data-[state=open]:rotate-45 group-data-[state=open]:scale-110"
						style={{ transitionDuration: '160ms', transitionTimingFunction: 'cubic-bezier(0.31,0.05,0.43,1.02)' }}
					></div>
					<div
						data-position="bottom"
						className="absolute h-[1.5px] w-[14px] translate-y-[3.5px] bg-foreground transition-transform group-data-[state=open]:translate-y-0 group-data-[state=open]:-rotate-45 group-data-[state=open]:scale-110"
						style={{ transitionDuration: '160ms', transitionTimingFunction: 'cubic-bezier(0.31,0.05,0.43,1.02)' }}
					></div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="z-40 h-[calc(100vh-4.0625rem)] w-screen animate-none rounded-none border-none bg-background/90 p-0 px-3 shadow-none backdrop-blur transition-transform data-[state=closed]:!zoom-out-100 data-[state=open]:!zoom-in-100 supports-[backdrop-filter]:bg-background/90 lg:hidden">
				<ScrollArea>
					<section className="my-3 px-3">
						<MobileAuth />
					</section>
					<section className="py-3">
						<Accordion type="multiple" className="px-3">
							<AccordionItem value="resources" className="border-none">
								<AccordionTrigger className="h-10 py-2 text-base text-muted-foreground hover:no-underline">
									Resources
								</AccordionTrigger>
								<AccordionContent className="pb-0">
									<PopoverClose asChild>
										<Button
											variant="link"
											className="h-10 w-full justify-start px-0 text-base text-muted-foreground hover:text-foreground hover:no-underline"
											asChild
										>
											<Link href="/">Commands</Link>
										</Button>
									</PopoverClose>
									<PopoverClose asChild>
										<Button
											variant="link"
											className="h-10 w-full justify-start px-0 text-base text-muted-foreground hover:text-foreground hover:no-underline"
											asChild
										>
											<Link href="/">Blog</Link>
										</Button>
									</PopoverClose>
									<PopoverClose asChild>
										<Button
											variant="link"
											className="h-10 w-full justify-start px-0 text-base text-muted-foreground hover:text-foreground hover:no-underline"
											asChild
										>
											<Link href="/">Changelog</Link>
										</Button>
									</PopoverClose>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="legal" className="border-none">
								<AccordionTrigger className="h-10 py-2 text-base text-muted-foreground hover:no-underline">
									Legal
								</AccordionTrigger>
								<AccordionContent className="pb-0">
									<PopoverClose asChild>
										<Button
											variant="link"
											className="h-10 w-full justify-start px-0 text-base text-muted-foreground hover:text-foreground hover:no-underline"
											asChild
										>
											<Link href="/legal/terms">Terms of Service</Link>
										</Button>
									</PopoverClose>
									<PopoverClose asChild>
										<Button
											variant="link"
											className="h-10 w-full justify-start px-0 text-base text-muted-foreground hover:text-foreground hover:no-underline"
											asChild
										>
											<Link href="/legal/privacy">Privacy Policy</Link>
										</Button>
									</PopoverClose>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						<PopoverClose asChild>
							<Button
								variant="link"
								className="h-10 w-full justify-start px-3 text-base text-muted-foreground hover:text-foreground hover:no-underline"
								asChild
							>
								<Link href={siteConfig.external.links.topgg} className="gap-1" target="_blank" rel="noreferrer">
									Vote on Top.gg
									<ExternalLink size={14} strokeWidth={1.5} />
								</Link>
							</Button>
						</PopoverClose>
					</section>
				</ScrollArea>
			</PopoverContent>
		</Popover>
	);
}
