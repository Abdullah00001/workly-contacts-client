'use client';

import {
  Send,
  LogOut,
  User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function NavUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            MW
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-72 mr-4 md:mr-7 ">
        <DropdownMenuItem className="py-3 hover:bg-transparent">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              MW
            </AvatarFallback>
          </Avatar>
          <div className="ml-1 flex flex-col">
            <p className="text-sm font-medium">My Workspace</p>
            <p className="text-xs text-muted-foreground">
              myworkspace.slack.com
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-1" /> Accounts Center
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Send className="mr-1" /> Feedback
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-1" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
