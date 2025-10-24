'use client';

import { useEffect, useState, type FC } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/common/Icon';
import {
  TContactDetailInfoHeader,
  TContactDetails,
  TToggleFavoriteStatus,
} from '../types/type';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { ToggleFavoriteStatus } from '../service/contact-detail-service';
import TrashModal from '@/features/dashboard/components/TrashModal';

const ContactDetailsHeader: FC<TContactDetailInfoHeader> = ({ details }) => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();
  const { mutate: favoriteToggle, isPending: favoriteTogglePending } =
    useMutation({
      mutationFn: async (payload: TToggleFavoriteStatus) =>
        await ToggleFavoriteStatus(payload),
      onSuccess: (data: TContactDetails) => {
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
        queryClient.setQueryData(
          ['contacts', details?._id],
          (oldData: AxiosResponse) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              isFavorite: data,
            };
          }
        );
        if (data?.isFavorite === false)
          toast(`${data?.firstName} ${data?.lastName} removed from contact`, {
            closeButton: false,
            position: 'bottom-center',
          });
        if (data?.isFavorite === true)
          toast(`Added ${data?.firstName} ${data?.lastName} to favorites`, {
            closeButton: false,
            position: 'bottom-center',
          });
      },
      onError: (error) => {
        if (error instanceof AxiosError)
          toast.error(error.response?.data?.message, {
            closeButton: false,
            position: 'bottom-center',
          });
        toast.error('Unwanted error occurred,Try Again!');
      },
    });
  const handlePrint = () => {
    const { birthday, email, firstName, lastName, location, phone, worksAt } =
      details;
    const data = [
      { birthday, email, firstName, lastName, location, phone, worksAt },
    ];
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
  };
  const handleFavoriteToggle = () => {
    favoriteToggle({
      id: details?._id,
      payload: { isFavorite: !details?.isFavorite },
    });
  };
  const loading = favoriteTogglePending;
  useEffect(() => {
    if (loading) {
      toast('Working...', { closeButton: false, position: 'bottom-center' });
    }
  }, [loading]);
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 769);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return (
    <div className="flex xl:max-w-[1032px] justify-between items-center px-2 pt-2 contact-details-header-padding">
      <div
        onClick={() => router.back()}
        className="w-12 h-12 flex justify-center items-center"
      >
        <div className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center">
          <Icon
            name="arrow_back"
            size={24}
            variant="outlined"
            type="icons"
            className="text-[#444746]"
          />
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div
          onClick={handleFavoriteToggle}
          className="w-12 h-12 flex justify-center items-center"
        >
          {details?.isFavorite ? (
            <div className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#0b57d016] transition-colors flex items-center justify-center">
              <Icon
                name="star"
                size={22}
                variant="filled"
                type="icons"
                className="text-[#0b57d0]"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center">
              <Icon
                name="star_border"
                size={22}
                variant="outlined"
                type="icons"
                className="text-[#444746]"
              />
            </div>
          )}
        </div>
        {isMobile ? (
          <div className="w-12 h-12 flex justify-center items-center">
            <div
              onClick={() => router.push(`/person/${details?._id}?edit=1`)}
              className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center"
            >
              <Icon
                name="edit"
                size={22}
                variant="outlined"
                type="symbols"
                className="text-[#444746]"
              />
            </div>
          </div>
        ) : (
          <button
            onClick={() => router.push(`/person/${details?._id}?edit=1`)}
            className="h-10 cursor-pointer text-white bg-[#0b57d0] rounded-[24px] px-6 font-medium font-google-sans-text"
          >
            Edit
          </button>
        )}
        <div className="w-12 h-12 flex justify-center items-center">
          <div
            onClick={() => {
              setOpen(true);
            }}
            className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center"
          >
            <Icon
              name="delete"
              size={22}
              variant="outlined"
              type="symbols"
              className="text-[#444746]"
            />
          </div>
        </div>
        <div className="w-12 h-12 flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="h-10 w-10 rounded-full cursor-pointer hover:bg-[#44474616] transition-colors flex items-center justify-center">
              <Icon
                name="more_vert"
                size={22}
                variant="outlined"
                type="icons"
                className="text-[#444746]"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`absolute right-0 w-[180px] mr-2 lg:mr-[10px] bg-white border border-gray-200  shadow-lg  px-0 rounded-[8px] py-2`}
            >
              <DropdownMenuItem
                onClick={handlePrint}
                className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer rounded-none"
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
              <DropdownMenuItem className="w-full text-left px-4 py-2 text-sm !text-[#1F1F1F] hover:!bg-gray-200 flex items-center gap-4 cursor-pointer rounded-none">
                <Icon
                  name="file_upload"
                  variant="outlined"
                  className=" text-[#444746]"
                  size={22}
                  type="icons"
                />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TrashModal
        isDetailPage={true}
        open={open}
        setOpen={setOpen}
        singleId={details?._id}
      />
    </div>
  );
};

export default ContactDetailsHeader;
