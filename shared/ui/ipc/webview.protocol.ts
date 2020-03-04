import { CodemarkType } from "@codestream/protocols/api";
import { NotificationType } from "vscode-jsonrpc";
import { Range } from "vscode-languageserver-types";
import { IpcRoutes } from "./webview.protocol.common";

export * from "./webview.protocol.common";

export * from "./host.protocol";
export * from "./host.protocol.editor";
export * from "./host.protocol.notifications";
export * from "./host.protocol.review";
export * from "./host.protocol.vsls";

export * from "./webview.protocol.notifications";

// TODO: This should be a request to the webview -- not a notification
export interface ShowCodemarkNotification {
	codemarkId: string;
	sourceUri?: string;
}
export const ShowCodemarkNotificationType = new NotificationType<ShowCodemarkNotification, void>(
	`${IpcRoutes.Webview}/codemark/show`
);

// TODO: This should be a request to the webview -- not a notification
export interface ShowReviewNotification {
	reviewId: string;
	sourceUri?: string;
}
export const ShowReviewNotificationType = new NotificationType<ShowReviewNotification, void>(
	`${IpcRoutes.Webview}/review/show`
);

// TODO: This should be a request to the webview -- not a notification
export interface ShowStreamNotification {
	streamId: string;
	threadId?: string;
	codemarkId?: string;
}
export const ShowStreamNotificationType = new NotificationType<ShowStreamNotification, void>(
	`${IpcRoutes.Webview}/stream/show`
);

// TODO: This should be a request to the webview -- not a notification
export interface NewCodemarkNotification {
	uri: string;
	range: Range;
	type: CodemarkType;
	source?: string;
}

export const NewCodemarkNotificationType = new NotificationType<NewCodemarkNotification, void>(
	`${IpcRoutes.Webview}/codemark/new`
);

export interface NewReviewNotification {
	uri: string;
	range: Range;
	source?: string;
}

export const NewReviewNotificationType = new NotificationType<NewReviewNotification, void>(
	`${IpcRoutes.Webview}/review/new`
);
