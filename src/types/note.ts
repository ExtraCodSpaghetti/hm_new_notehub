export interface note{
id: string
title: string
content: string
createdAt: string
updatedAt: string
tag: NotTag
}

export type NotTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo"