'use client';

import Icon from '@/components/common/Icon';
import { useEffect, useState, type FC } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TPrintModal } from '../types/type';
import { useMutation } from '@tanstack/react-query';
import { ExportContacts } from '../services/contacts-service';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const PrintModal: FC<TPrintModal> = ({
  allContacts,
  selectedContacts,
  printModalOpen,
  setPrintModalOpen,
  setSelectContact,
}) => {
  const hasSelectedContacts = selectedContacts.length > 0;
  const [printOption, setPrintOption] = useState<'selected' | 'all'>(
    hasSelectedContacts ? 'selected' : 'all'
  );
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: string[]) => ExportContacts(payload),
    onSuccess: (data) => {
      const printWindow = window.open('', '_blank');

      if (printWindow) {
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Print Contacts</title>
              <style>
                @media print {
                  @page {
                    margin: 15mm;
                    size: A4;
                  }
                  body {
                    margin: 0;
                    padding: 0;
                  }
                }
                * {
                  box-sizing: border-box;
                }
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  line-height: 1.6;
                  color: #1f1f1f;
                  padding: 20px;
                  background: #fff;
                }
                .print-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                  margin-bottom: 30px;
                  padding-bottom: 15px;
                  border-bottom: 2px solid #333;
                }
                .print-date {
                  color: #666;
                  font-size: 12px;
                  text-align: right;
                }
                .contact-count {
                  color: #666;
                  font-size: 14px;
                  font-weight: 500;
                }
                .contacts-list {
                  display: flex;
                  flex-direction: column;
                  gap: 30px;
                }
                .contact {
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  page-break-inside: avoid;
                  background: #fff;
                }
                .contact-name {
                  font-size: 18px;
                  font-weight: 600;
                  color: #1f1f1f;
                  margin-bottom: 4px;
                }
                .contact-job {
                  font-size: 14px;
                  color: #666;
                  margin-bottom: 16px;
                  font-weight: 500;
                }
                .contact-info {
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                }
                .info-row {
                  display: flex;
                  flex-direction: column;
                  gap: 4px;
                }
                .info-label {
                  font-weight: 600;
                  color: #333;
                  font-size: 12px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .info-value {
                  color: #1f1f1f;
                  font-size: 14px;
                  line-height: 1.4;
                }
                h1 {
                  font-size: 24px;
                  font-weight: 600;
                  margin: 0;
                  color: #1f1f1f;
                }
              </style>
            </head>
            <body>
              <div class="print-header">
                <div>
                  <h1>Contacts</h1>
                  <div class="contact-count">${data.length} contact${data.length !== 1 ? 's' : ''}</div>
                </div>
                <div class="print-date">
                  ${new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                  <br />
                  ${new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              <div class="contacts-list">
                ${data
                  .map((contact: any) => {
                    const jobInfo =
                      contact.worksAt?.jobTitle || contact.worksAt?.companyName
                        ? `${contact.worksAt?.jobTitle || ''}${
                            contact.worksAt?.jobTitle &&
                            contact.worksAt?.companyName
                              ? ', '
                              : ''
                          }${contact.worksAt?.companyName || ''}`
                        : '';

                    const addressParts = [];
                    if (contact.location?.streetAddress)
                      addressParts.push(contact.location.streetAddress);
                    if (contact.location?.city)
                      addressParts.push(contact.location.city);
                    if (contact.location?.country)
                      addressParts.push(contact.location.country);
                    if (contact.location?.postCode)
                      addressParts.push(contact.location.postCode);
                    const fullAddress = addressParts.join(', ');

                    const birthdayText =
                      contact.birthday?.month && contact.birthday?.day
                        ? `${contact.birthday.month} ${contact.birthday.day}${
                            contact.birthday.year
                              ? ', ' + contact.birthday.year
                              : ''
                          }`
                        : '';

                    return `
                      <div class="contact">
                        <div class="contact-name">${contact.firstName || ''} ${contact.lastName || ''}</div>
                        ${jobInfo ? `<div class="contact-job">${jobInfo}</div>` : ''}
                        
                        <div class="contact-info">
                          ${
                            contact.email
                              ? `
                            <div class="info-row">
                              <div class="info-label">Email</div>
                              <div class="info-value">${contact.email}</div>
                            </div>
                          `
                              : ''
                          }
                          
                          ${
                            contact.phone?.number
                              ? `
                            <div class="info-row">
                              <div class="info-label">Phone</div>
                              <div class="info-value">${contact.phone.countryCode || ''} ${contact.phone.number}</div>
                            </div>
                          `
                              : ''
                          }
                          
                          ${
                            fullAddress
                              ? `
                            <div class="info-row">
                              <div class="info-label">Address</div>
                              <div class="info-value">${fullAddress}</div>
                            </div>
                          `
                              : ''
                          }
                          
                          ${
                            birthdayText
                              ? `
                            <div class="info-row">
                              <div class="info-label">Birthday</div>
                              <div class="info-value">${birthdayText}</div>
                            </div>
                          `
                              : ''
                          }
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            </body>
          </html>
        `;

        printWindow.document.body.innerHTML = htmlContent;
        printWindow.document.close();

        // Wait for content to load, then print
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
        }, 500);
      }
      toast('Contacts ready to print!', {
        closeButton: false,
        position: 'bottom-center',
      });
      setPrintModalOpen(false);
      setSelectContact([]);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const err = error.response?.data;
        toast(err, { closeButton: false, position: 'bottom-center' });
        return;
      }
      toast('Unknown error occurred, Try Again!', {
        closeButton: false,
        position: 'bottom-center',
      });
    },
  });
  const handlePrint = () => {
    const contactsToPrint =
      printOption === 'selected' ? selectedContacts : allContacts;

    if (contactsToPrint.length === 0) {
      toast.error('No contacts to print');
      return;
    }

    mutate(contactsToPrint);
  };
  useEffect(() => {
    if (isPending) {
      toast('Working...', { closeButton: false, position: 'bottom-center' });
    }
  }, [isPending]);
  useEffect(() => {
    if (printModalOpen) {
      setPrintOption(hasSelectedContacts ? 'selected' : 'all');
    }
  }, [printModalOpen, hasSelectedContacts]);
  return (
    <Dialog open={printModalOpen} onOpenChange={setPrintModalOpen}>
      <DialogContent className="bg-white rounded-[18px] w-[348px] px-6 py-5 shadow-lg ">
        <DialogHeader>
          <DialogTitle className="text-[1.5rem] font-normal font-google-sans text-[#1f1f1f]">
            Print contacts
          </DialogTitle>
          <DialogDescription className="mt-4 text-sm text-[#5f6368] font-google-sans">
            Your contacts will be formatted and sent to the printer. Please make
            sure your printer is connected.
          </DialogDescription>
        </DialogHeader>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full rounded-t-[6px] cursor-pointer flex justify-between items-center bg-[#e1e3e1] mt-3 border-b-black border-b">
            <div className="pl-3 text-[#444746] font-google-sans-text">
              {printOption === 'selected'
                ? `Selected contacts (${selectedContacts.length})`
                : `Contacts (${allContacts.length})`}
            </div>
            <div className="h-[56px] flex justify-center items-center">
              <Icon
                name="arrow_drop_down"
                size={24}
                type="icons"
                variant="filled"
                className="mx-3 text-[#444746]"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] !rounded-none !p-0">
            <DropdownMenuItem
              onSelect={() => setPrintOption('selected')}
              disabled={!hasSelectedContacts}
              className={`!text-[#000000] cursor-pointer !rounded-none hover:!bg-[#e1e3e1] !text-[16px] font-google-sans-text !p-3 ${printOption === 'selected' && '!bg-[#e1e3e1]'}`}
            >
              Selected contacts {`(${selectedContacts.length})`}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setPrintOption('all')}
              className={`!text-[#000000] cursor-pointer !rounded-none hover:!bg-[#e1e3e1] !text-[16px] font-google-sans-text !p-3 ${printOption === 'all' && '!bg-[#e1e3e1]'}`}
            >
              Contacts {`(${allContacts.length})`}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogFooter className="flex justify-end items-center mt-6 gap-1">
          <DialogClose asChild>
            <button className="text-[#0b57d0] px-4 py-2 rounded-[16px] cursor-pointer font-google-sans text-sm font-medium text-center hover:bg-[rgba(11,87,208,0.08)]">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handlePrint}
            className={` px-4 py-2 rounded-[16px] font-google-sans text-sm font-medium text-center  hover:bg-[rgba(11,87,208,0.08)] text-[#0b57d0] cursor-pointer`}
          >
            Print
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintModal;
