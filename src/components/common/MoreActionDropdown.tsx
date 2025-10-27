'use client';

import { useEffect, useState, type FC } from 'react';
import Icon from '@/components/common/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TrashModal from '@/features/dashboard/components/TrashModal';
import { TMoreActionDropDown } from '@/features/dashboard/types/type';
import { useMutation } from '@tanstack/react-query';
import { ExportSingleContacts } from '@/features/dashboard/services/contacts-service';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import SingleExportModal from '@/features/dashboard/components/SingleExportModal';
import MoreActionLabelChange from './MoreActionLabelChange';

const MoreActionDropDown: FC<TMoreActionDropDown> = ({
  contact,
  isSelected,
  handleMoreActionsClick,
  isMoreActionOpen,
  setIsMoreActionOpen,
  setSelectContact,
  setSingleExportModalOpen,
  singleExportModalOpen,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { _id } = contact;
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: string) => await ExportSingleContacts(payload),
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
      toast('Contact ready to print!', {
        closeButton: false,
        position: 'bottom-center',
      });
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
  const loading = isPending;
  useEffect(() => {
    if (loading) {
      toast('Working...', { closeButton: false, position: 'bottom-center' });
    }
  }, [loading]);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <DropdownMenu open={isMoreActionOpen} onOpenChange={setIsMoreActionOpen}>
        <DropdownMenuTrigger
          onClick={handleMoreActionsClick}
          className={`${isSelected ? 'hover:bg-[#0b57d030]' : 'hover:bg-gray-200'} w-[40px] h-[40px] flex items-center justify-center  cursor-pointer rounded-full `}
        >
          <Icon
            name={'more_vert'}
            variant="outlined"
            className=" text-[#444746]"
            type="icons"
            size={20}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          className="hidden sm:block w-[270px] mr-[46px] lg:mr-[72px] bg-white border border-gray-200  shadow-lg z-50 px-0 rounded-none py-2"
        >
          <div className="pb-2 border-b">
            <DropdownMenuItem
              onClick={() => {
                mutate(_id);
              }}
              className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer hover:rounded-none"
            >
              <Icon
                name="print"
                variant="filled"
                className="text-[#444746]"
                size={22}
                type="icons"
              />
              Print
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setSingleExportModalOpen(true);
                setIsMoreActionOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer hover:rounded-none"
            >
              <Icon
                name="file_upload"
                variant="outlined"
                className=" text-[#444746]"
                size={22}
                type="icons"
              />
              Export
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpen(true);
                setIsMoreActionOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer hover:rounded-none"
            >
              <Icon
                name="delete"
                variant="outlined"
                className=" text-[#444746]"
                size={22}
                type="symbols"
              />
              Delete
            </DropdownMenuItem>
          </div>
          <MoreActionLabelChange contact={contact} />
        </DropdownMenuContent>
      </DropdownMenu>
      <SingleExportModal
        contactId={contact?._id}
        setSingleExportModalOpen={setSingleExportModalOpen}
        singleExportModalOpen={singleExportModalOpen}
      />
      <TrashModal
        setSelectContact={setSelectContact}
        open={open}
        setOpen={setOpen}
        singleId={_id}
      />
    </div>
  );
};

export default MoreActionDropDown;
