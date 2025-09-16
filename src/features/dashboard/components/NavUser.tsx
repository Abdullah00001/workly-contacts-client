'use client';

import { Send, LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogoutModalStore } from '@/stores/logout-modal-store';
import { useFeedbackModalStore } from '@/stores/feedback-modal-store';

export default function NavUser() {
  const { toggleLogoutModal } = useLogoutModalStore();
  const { toggleFeedbackModal } = useFeedbackModalStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-0">
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            MW
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-72 mr-4 md:mr-7 ">
        <DropdownMenuItem className="py-3 cursor-pointer hover:!bg-gray-100 hover:!text-primary">
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
        <DropdownMenuItem className="cursor-pointer hover:!bg-gray-100 hover:!text-primary">
          <User className="mr-1" /> Accounts Center
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleFeedbackModal()}
          className="cursor-pointer hover:!bg-gray-100 hover:!text-primary"
        >
          <Send className="mr-1" /> Feedback
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleLogoutModal()}
          className="cursor-pointer hover:!bg-gray-100 hover:!text-primary"
        >
          <LogOut className="mr-1" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
