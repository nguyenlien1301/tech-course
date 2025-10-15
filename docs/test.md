UCademy-App                              --> level 0
├── .vscode                               --> level 1
├── public                                --> level 1
├── src                                   --> level 1
│   ├── app                               --> level 2
│   │   ├── (dashboard)                   --> level 3
│   │   │   ├── [course]/lesson           --> level 4
│   │   │   │   └── page.tsx              --> level 5
│   │   │   ├── course/[slug]             --> level 4
│   │   │   │   └── page.tsx              --> level 5
│   │   │   ├── manage                    --> level 4
│   │   │   │   ├── comment               --> level 5
│   │   │   │   │   └── page.tsx          --> level 6
│   │   │   │   ├── coupon                --> level 5
│   │   │   │   │   ├── new               --> level 6
│   │   │   │   │   │   └── page.tsx      --> level 7
│   │   │   │   │   ├── update            --> level 6
│   │   │   │   │   │   └── page.tsx      --> level 7
│   │   │   │   │   └── page.tsx          --> level 6
│   │   │   │   ├── course                --> level 5
│   │   │   │   │   ├── new               --> level 6
│   │   │   │   │   │   └── page.tsx      --> level 7
│   │   │   │   │   ├── outline           --> level 6
│   │   │   │   │   │   └── page.tsx      --> level 7
│   │   │   │   │   ├── update            --> level 6
│   │   │   │   │   │   └── page.tsx      --> level 7
│   │   │   │   │   └── page.tsx          --> level 6
│   │   │   │   ├── member                --> level 5
│   │   │   │   │   └── page.tsx          --> level 6
│   │   │   │   ├── order                 --> level 5
│   │   │   │   │   └── page.tsx          --> level 6
│   │   │   │   ├── rating                --> level 5
│   │   │   │   │   ├── page.tsx          --> level 6
│   │   │   │   └── layout.tsx            --> level 6
│   │   │   │   ├── order/[code]          --> level 5
│   │   │   │   │   └── page.tsx          --> level 6
│   │   │   │   └── study                 --> level 5
│   │   │   │       ├── page.tsx          --> level 6
│   │   │   ├── layout.tsx                --> level 6
│   │   │   └── page.tsx                  --> level 6
│   │   ├── api                           --> level 3
│   │   │   ├── uploadthing               --> level 4
│   │   │   └── webhook                   --> level 4
│   │   ├── sign-in                       --> level 3
│   │   ├── sign-up                       --> level 3
│   │   ├── favicon.ico                   --> level 3
│   │   ├── globals.scss                  --> level 3
│   │   ├── layout.tsx                    --> level 3
│   │   └── not-found.tsx                 --> level 3
│
│   ├── modules                           --> level 2
│   │   ├── comment/actions               --> level 3
│   │   │   ├── comment.actions.ts        --> level 4
│   │   │   └── index.ts                  --> level 4
│   │   ├── coupon                        --> level 3
│   │   │   ├── actions                   --> level 4
│   │   │   │   ├── coupon.actions.ts     --> level 5
│   │   │   │   └── index.ts              --> level 5
│   │   │   ├── pages                     --> level 4
│   │   │   │   ├── create                --> level 5
│   │   │   │   │   ├── components        --> level 6
│   │   │   │   │   │   ├── create-coupon-container.tsx --> level 7
│   │   │   │   │   │   └── index.ts      --> level 7
│   │   │   │   │   ├── create-coupon-page.tsx         --> level 6
│   │   │   │   │   └── index.ts          --> level 6
│   │   │   │   ├── manage                --> level 5
│   │   │   │   │   ├── components        --> level 6
│   │   │   │   │   │   ├── delete-coupon-modal.tsx    --> level 7
│   │   │   │   │   │   ├── manage-coupon-container.tsx --> level 7
│   │   │   │   │   │   └── index.ts      --> level 7
│   │   │   │   │   ├── manage-coupon-page.tsx         --> level 6
│   │   │   │   │   └── index.ts          --> level 6
│   │   │   │   ├── update                --> level 5
│   │   │   │   │   ├── components        --> level 6
│   │   │   │   │   │   ├── update-coupon-container.tsx --> level 7
│   │   │   │   │   │   └── index.ts      --> level 7
│   │   │   │   │   ├── update-coupon-page.tsx         --> level 6
│   │   │   │   │   └── index.ts          --> level 6
│   │   │   │   └── index.ts                 --> level 5
│   │   │   ├── schemas                   --> level 4
│   │   │   │   ├── coupon.schema.ts      --> level 5
│   │   │   │   └── index.ts              --> level 5
│   │   │   ├── types                     --> level 4
│   │   │   │   ├── coupon.types.ts       --> level 5
│   │   │   │   └── index.ts              --> level 5
│   │   ├── course                        --> level 3
│   │   │   ├── actions
│   │   │   │   ├── course.actions.ts
│   │   │   │   └── index.ts
│   │   │   ├── components
│   │   │   │   └── course-item
│   │   │   │   │   ├── course-item-duration.tsx
│   │   │   │   │   ├── course-item.tsx
│   │   │   │   │   └── index.ts
│   │   │   ├── pages
│   │   │   │   ├── course-dashboard
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── course-dashboard-container.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── course-dashboard-page.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   │   │
│   │   │   │   ├── course-details
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── benefit-item.tsx
│   │   │   │   │   │   ├── already-enroll.tsx
│   │   │   │   │   │   ├── button-enroll.tsx
│   │   │   │   │   │   ├── coupon-form.tsx
│   │   │   │   │   │   ├── course-details-container.tsx
│   │   │   │   │   │   ├── course-widget.tsx
│   │   │   │   │   │   ├── qa-item.tsx
│   │   │   │   │   │   ├── rating-item.tsx
│   │   │   │   │   │   ├── requirement-item.tsx
│   │   │   │   │   │   ├── section-info-item.tsx
│   │   │   │   │   │   ├── section-item.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── course-details-page.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   │   │
│   │   │   │   │── course-lesson
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── course-lesson-comment
│   │   │   │   │   │   │   ├── comment-field.tsx
│   │   │   │   │   │   │   ├── comment-form.tsx
│   │   │   │   │   │   │   ├── comment-reply.tsx
│   │   │   │   │   │   │   ├── comment-sorting.tsx
│   │   │   │   │   │   │   ├── course-lesson-comment.tsx
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │── course-lesson-player
│   │   │   │   │   │   │  ├── course-lesson-player.tsx
│   │   │   │   │   │   │  ├── lesson-navigation.tsx
│   │   │   │   │   │   │  ├── lesson-save-url.tsx
│   │   │   │   │   │   │  ├── loading-player.tsx
│   │   │   │   │   │   │  ├── rating-button.tsx
│   │   │   │   │   │   │  ├── video-player.tsx
│   │   │   │   │   │   │  └── index.ts
│   │   │   │   │   │   │  │
│   │   │   │   │   │   ├── course-lesson-container.tsx
│   │   │   │   │   │   ├── course-lesson-outline.tsx
│   │   │   │   │   │   ├── lesson-wrapper.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── course-lesson-page.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   │── create
│   │   │   │   │   │── components
│   │   │   │   │   │   │── create-course-container.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   │── create-course-page.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   │── manage
│   │   │   │   │   │── components
│   │   │   │   │   │   │── create-manage-container.tsx
│   │   │   │   │   │   │── course-manage.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   │── course-manage-page.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   │── outline
│   │   │   │   │   │── components
│   │   │   │   │   │   │── outline-action.tsx
│   │   │   │   │   │   │── outline-course-container.tsx
│   │   │   │   │   │   │── outline-draggable-content.tsx
│   │   │   │   │   │   │── outline-draggable-handle.tsx
│   │   │   │   │   │   │── outline-draggable-item.tsx
│   │   │   │   │   │   │── outline-draggable-overlay.tsx
│   │   │   │   │   │   │── outline-item.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   │── outline-course-page.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   │── study
│   │   │   │   │   │── components
│   │   │   │   │   │   │── study-page-container.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   │── study-page.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   │── update
│   │   │   │   │   │── components
│   │   │   │   │   │   │── update-course-container.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   │── update-course-page.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── schema
│   │   │   │   ├── course.schema.ts
│   │   │   │   └── index.ts
│   │   │   ├── types
│   │   │   │   ├── course.types.ts
│   │   │   │   └── index.ts
│   │   ├── history
│   │   │   ├── actions
│   │   │   │   ├── history.action.ts
│   │   │   │   └── index.ts
│   │   ├── lecture
│   │   │   ├── actions
│   │   │   │   ├── lecture.action.ts
│   │   │   │   └── index.ts
│   │   ├── lesson
│   │   │   ├── actions
│   │   │   │   ├── lesson.action.ts
│   │   │   │   └── index.ts
│   │   ├── order
│   │   │   ├── actions
│   │   │   │   ├── order.action.ts
│   │   │   │   └── index.ts
│   │   │   ├── pages
│   │   │   │   ├── order-manage-page
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── order-manage-container.tsx
│   │   │   │   │   │   ├── order-action.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── order-manage-page.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── types
│   │   │   │   ├── order-types.ts
│   │   ├── rating
│   │   │   ├── actions
│   │   │   │   ├── rating.action.ts
│   │   │   │   └── index.ts
│   │   │   ├── pages
│   │   │   │   ├── rating-manage
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── rating-manage-container.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── rating-manage-page.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   ├── user
│   │   │   ├── actions
│   │   │   │   ├── user.action.ts
│   │   │   │   └── index.ts
│   ├── shared                           
│   │   ├── components                  
│   │   │   ├── common                  
│   │   │   │   ├── active-link.tsx                  
│   │   │   │   ├── badge-status.tsx                  
│   │   │   │   ├── bounced-link.tsx                  
│   │   │   │   ├── course-grid.tsx                  
│   │   │   │   ├── empty-space.tsx                  
│   │   │   │   ├── heading.tsx                  
│   │   │   │   ├── loading.tsx         
│   │   │   │   ├── menu-item.tsx         
│   │   │   │   ├── mode-toggle.tsx         
│   │   │   │   ├── pagination.tsx         
│   │   │   │   ├── table-action.tsx         
│   │   │   │   ├── table-action-item.tsx         
│   │   │   │   ├── theme-provider.tsx         
│   │   │   │   └── index.ts         
│   │   │   ├── course      
│   │   │   │   ├── course-outline-item.tsx             
│   │   │   │   ├── course-outline.tsx    
│   │   │   │   └── index.ts         
│   │   │   ├── icons                  
│   │   │   ├── layout   
│   │   │   │   ├── sidebar.tsx  
│   │   │   │   └── index.ts             
│   │   │   ├── ui  
│   │   │   │   ├── accordion.tsx                
│   │   │   │   ├── button.tsx                
│   │   │   │   ├── calendar.tsx                
│   │   │   │   ├── checkbox.tsx                
│   │   │   │   ├── dialog.tsx                
│   │   │   │   ├── dropdown-menu.tsx                
│   │   │   │   ├── form.tsx                
│   │   │   │   ├── input-format.tsx                
│   │   │   │   ├── input.tsx                
│   │   │   │   ├── lable.tsx                
│   │   │   │   ├── popover.tsx                
│   │   │   │   ├── radio-group.tsx                
│   │   │   │   ├── select.tsx                
│   │   │   │   ├── switch.tsx                
│   │   │   │   ├── table.tsx                
│   │   │   │   ├── textarea.tsx                
│   │   │   │   ├── index.ts
│   │   ├── constants     
│   │   │   │   ├── app-constant.tsx                
│   │   │   │   ├── coupon-constant.tsx                
│   │   │   │   ├── course-constant.tsx                
│   │   │   │   ├── menu-constant.tsx                
│   │   │   │   ├── order-constant.tsx                
│   │   │   │   ├── rating-constant.tsx                
│   │   │   │   ├── enums.ts              
│   │   │   │   ├── index.ts
│   │   ├── contexts  
│   │   │   │   ├── user-context.tsx                 
│   │   │   │   ├── index.ts                 
│   │   ├── helpers         
│   │   │   │   ├── date-helper.tsx         
│   │   │   │   ├── number-helper.tsx         
│   │   │   │   ├── index.ts
│   │   ├── hook       
│   │   │   │   ├── use-query-string.tsx            
│   │   │   │   ├── index.ts            
│   │   ├── lib        
│   │   │   │   ├── mongoose.tsx           
│   │   │   │   ├── index.ts
│   │   ├── schemas       
│   │   │   │   ├── comment.schema.ts        
│   │   │   │   ├── coupon.schema.ts           
│   │   │   │   ├── coure.schema.ts           
│   │   │   │   ├── history.schema.ts           
│   │   │   │   ├── lecture.schema.ts           
│   │   │   │   ├── lesson.schema.ts           
│   │   │   │   ├── order.schema.ts           
│   │   │   │   ├── rating.schema.ts           
│   │   │   │   ├── user.schema.ts           
│   │   │   │   ├── index.ts           
│   │   ├── store        
│   │   │   │   ├── app-store.ts            
│   │   │   │   ├── index.ts            
│   │   ├── types   
│   │   │   │   ├── models
│   │   │   │   │   │   ├── commnent.model.ts       
│   │   │   │   │   │   ├── coupon.model.ts       
│   │   │   │   │   │   ├── course.model.ts       
│   │   │   │   │   │   ├── history.model.ts       
│   │   │   │   │   │   ├── lecture.model.ts       
│   │   │   │   │   │   ├── lesson.model.ts       
│   │   │   │   │   │   ├── order.model.ts       
│   │   │   │   │   │   ├── rating.model.ts       
│   │   │   │   │   │   ├── user.model.ts       
│   │   │   │   │   │   ├── index.ts       
│   │   │   │   ├── app.type.ts               
│   │   │   │   ├── comment.type.ts               
│   │   │   │   ├── common.type.ts               
│   │   │   │   ├── coupon.type.ts               
│   │   │   │   ├── course.type.ts               
│   │   │   │   ├── history.type.ts               
│   │   │   │   ├── lecture.type.ts               
│   │   │   │   ├── lesson.type.ts               
│   │   │   │   ├── order.type.ts               
│   │   │   │   ├── rating.type.ts               
│   │   │   │   ├── user.type.ts               
│   │   │   │   ├── index.ts               
│   │   ├── utils     
│   │   │   │   ├── common.ts             
│   │   │   │   ├── uploadthing.ts             
│   │   │   │   ├── index.ts             
│   │   ├── middleware.ts                  
│   │   ├── .eslintrc.js                  
│   │   ├── .gitignore                  
│   │   ├── .prettierrc.js                  
│   │   ├── .vercel.json                 
│   │   ├── components.json             
│   │   ├── next.config.mjs            
│   │   ├── package-lock.json             
│   │   ├── package.json             
│   │   ├── postcss.config.mjs             
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   ├── eslint.md             
│   │   ├── knowledge.md             
│   │   ├── outline.md             
│   │   ├── overview.md             
│   │   ├── README.md             
│   │   ├── requirement.md             
│   │   ├── roadmap.md             
│   │   ├── tsconfig.md