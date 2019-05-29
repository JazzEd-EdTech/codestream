import { createSelector } from "reselect";
import { toMapBy } from "../../utils";
import { ActionType } from "../common";
import * as actions from "./actions";
import { CodemarksActionsTypes, CodemarksState } from "./types";
import { CodemarkPlus } from "@codestream/protocols/agent";

type CodemarksActions = ActionType<typeof actions>;

const initialState: CodemarksState = {};

export function reduceCodemarks(state = initialState, action: CodemarksActions) {
	switch (action.type) {
		case CodemarksActionsTypes.AddCodemarks:
		case CodemarksActionsTypes.UpdateCodemarks:
		case CodemarksActionsTypes.SaveCodemarks: {
			return { ...state, ...toMapBy("id", action.payload) };
		}
		case CodemarksActionsTypes.Delete: {
			return {
				...state,
				[action.payload]: undefined! // Needs the ! to avoid undefined everywhere
			};
		}
		case "RESET":
			return initialState;
		default:
			return state;
	}
}

export function getCodemark(state: CodemarksState, id?: string): CodemarkPlus | undefined {
	if (!id) return undefined;
	return state[id];
}

export function getByType(state: CodemarksState, type?: string): CodemarkPlus[] {
	if (!type) return Object.values(state);

	return Object.values(state).filter(codemark => codemark.type === type);
}

const getCodemarks = state => state.codemarks;
const getCodemarkTypeFilter = state => state.context.codemarkTypeFilter;
export const getTypeFilteredCodemarks = createSelector(
	getCodemarks,
	getCodemarkTypeFilter,
	(codemarks: CodemarksState, filter: string) => {
		if (filter === "all") return Object.values(codemarks);
		else {
			return Object.values(codemarks).filter(
				codemark => codemark.type === filter && !codemark.deactivated
			);
		}
	}
);
const getCodemarkFileFilter = state => {
	const { context } = state;
	// let fileNameToFilterFor;
	let fileStreamIdToFilterFor;
	if (context.activeFile && context.fileStreamId) {
		// fileNameToFilterFor = context.activeFile;
		fileStreamIdToFilterFor = context.fileStreamId;
	} else if (context.activeFile && !context.fileStreamId) {
		// fileNameToFilterFor = context.activeFile;
	} else {
		// fileNameToFilterFor = context.lastActiveFile;
		fileStreamIdToFilterFor = context.lastFileStreamId;
	}
	return fileStreamIdToFilterFor;
};
export const getFileFilteredCodemarks = createSelector(
	getCodemarks,
	getCodemarkFileFilter,
	(codemarks: CodemarksState, filter: string) => {
		return Object.values(codemarks).filter(codemark => {
			const codeBlock = codemark.markers && codemark.markers.length && codemark.markers[0];
			const codeBlockFileStreamId = codeBlock && codeBlock.fileStreamId;
			return !codemark.deactivated && codeBlockFileStreamId === filter;
		});
	}
);

export const teamHasCodemarks = createSelector(
	getCodemarks,
	(codemarks: CodemarksState) => {
		return Object.keys(codemarks).length > 0;
	}
);
