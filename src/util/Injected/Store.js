'use strict';

exports.ExposeStore = () => {
    /**
     * Helper function that compares between two WWeb versions. Its purpose is to help the developer to choose the correct code implementation depending on the comparison value and the WWeb version.
     * @param {string} lOperand The left operand for the WWeb version string to compare with
     * @param {string} operator The comparison operator
     * @param {string} rOperand The right operand for the WWeb version string to compare with
     * @returns {boolean} Boolean value that indicates the result of the comparison
     */
    window.compareWwebVersions = (lOperand, operator, rOperand) => {
        if (!['>', '>=', '<', '<=', '='].includes(operator)) {
            throw new (class _ extends Error {
                constructor(m) {
                    super(m);
                    this.name = 'CompareWwebVersionsError';
                }
            })('Invalid comparison operator is provided');
        }
        if (typeof lOperand !== 'string' || typeof rOperand !== 'string') {
            throw new (class _ extends Error {
                constructor(m) {
                    super(m);
                    this.name = 'CompareWwebVersionsError';
                }
            })('A non-string WWeb version type is provided');
        }

        lOperand = lOperand.replace(/-beta$/, '');
        rOperand = rOperand.replace(/-beta$/, '');

        while (lOperand.length !== rOperand.length) {
            lOperand.length > rOperand.length
                ? (rOperand = rOperand.concat('0'))
                : (lOperand = lOperand.concat('0'));
        }

        lOperand = Number(lOperand.replace(/\./g, ''));
        rOperand = Number(rOperand.replace(/\./g, ''));

        return operator === '>'
            ? lOperand > rOperand
            : operator === '>='
                ? lOperand >= rOperand
                : operator === '<'
                    ? lOperand < rOperand
                    : operator === '<='
                        ? lOperand <= rOperand
                        : operator === '='
                            ? lOperand === rOperand
                            : false;
    };

    // Create window.WA as the primary object (newer WhatsApp Web API, undetectable)
    // This helps avoid detection and blocking by WhatsApp
    window.WA = Object.assign({}, window.require('WAWebCollections'));

    // Make window.Store point to window.WA for backward compatibility
    // Both references point to the same object
    window.Store = window.WA;

    // Now add all properties to window.WA (window.Store references the same object)
    window.WA.AppState = window.require('WAWebSocketModel').Socket;
    window.WA.BlockContact = window.require('WAWebBlockContactAction');
    window.WA.Conn = window.require('WAWebConnModel').Conn;
    window.WA.Cmd = window.require('WAWebCmd').Cmd;
    window.WA.DownloadManager = window.require('WAWebDownloadManager').downloadManager;
    window.WA.GroupQueryAndUpdate = window.require('WAWebGroupQueryJob').queryAndUpdateGroupMetadataById;
    window.WA.MediaPrep = window.require('WAWebPrepRawMedia');
    window.WA.MediaObject = window.require('WAWebMediaStorage');
    window.WA.MediaTypes = window.require('WAWebMmsMediaTypes');
    window.WA.MediaUpload = window.require('WAWebMediaMmsV4Upload');
    window.WA.MsgKey = window.require('WAWebMsgKey');
    window.WA.OpaqueData = window.require('WAWebMediaOpaqueData');
    window.WA.QueryProduct = window.require('WAWebBizProductCatalogBridge');
    window.WA.QueryOrder = window.require('WAWebBizOrderBridge');
    window.WA.SendClear = window.require('WAWebChatClearBridge');
    window.WA.SendDelete = window.require('WAWebDeleteChatAction');
    window.WA.SendMessage = window.require('WAWebSendMsgChatAction');
    window.WA.EditMessage = window.require('WAWebSendMessageEditAction');
    window.WA.SendSeen = window.require('WAWebUpdateUnreadChatAction');
    window.WA.User = window.require('WAWebUserPrefsMeUser');
    window.WA.ContactMethods = window.require('WAWebContactGetters');
    window.WA.UserConstructor = window.require('WAWebWid');
    window.WA.Validators = window.require('WALinkify');
    window.WA.WidFactory = window.require('WAWebWidFactory');
    window.WA.ProfilePic = window.require('WAWebContactProfilePicThumbBridge');
    window.WA.PresenceUtils = window.require('WAWebPresenceChatAction');
    window.WA.ChatState = window.require('WAWebChatStateBridge');
    window.WA.findCommonGroups = window.require('WAWebFindCommonGroupsContactAction').findCommonGroups;
    window.WA.StatusUtils = window.require('WAWebContactStatusBridge');
    window.WA.ConversationMsgs = window.require('WAWebChatLoadMessages');
    window.WA.sendReactionToMsg = window.require('WAWebSendReactionMsgAction').sendReactionToMsg;
    window.WA.createOrUpdateReactionsModule = window.require('WAWebDBCreateOrUpdateReactions');
    window.WA.EphemeralFields = window.require('WAWebGetEphemeralFieldsMsgActionsUtils');
    window.WA.MsgActionChecks = window.require('WAWebMsgActionCapability');
    window.WA.QuotedMsg = window.require('WAWebQuotedMsgModelUtils');
    window.WA.LinkPreview = window.require('WAWebLinkPreviewChatAction');
    window.WA.Socket = window.require('WADeprecatedSendIq');
    window.WA.SocketWap = window.require('WAWap');
    window.WA.SearchContext = window.require('WAWebChatMessageSearch');
    window.WA.DrawerManager = window.require('WAWebDrawerManager').DrawerManager;
    window.WA.LidUtils = window.require('WAWebApiContact');
    window.WA.WidToJid = window.require('WAWebWidToJid');
    window.WA.JidToWid = window.require('WAWebJidToWid');
    window.WA.getMsgInfo = window.require('WAWebApiMessageInfoStore').queryMsgInfo;
    window.WA.QueryExist = window.require('WAWebQueryExistsJob').queryWidExists;
    window.WA.ReplyUtils = window.require('WAWebMsgReply');
    window.WA.BotSecret = window.require('WAWebBotMessageSecret');
    window.WA.BotProfiles = window.require('WAWebBotProfileCollection');
    window.WA.ContactCollection = window.require('WAWebContactCollection').ContactCollection;
    window.WA.DeviceList = window.require('WAWebApiDeviceList');
    window.WA.HistorySync = window.require('WAWebSendNonMessageDataRequest');
    window.WA.AddonReactionTable = window.require('WAWebAddonReactionTableMode').reactionTableMode;
    window.WA.AddonPollVoteTable = window.require('WAWebAddonPollVoteTableMode').pollVoteTableMode;
    window.WA.ChatGetters = window.require('WAWebChatGetters');
    window.WA.UploadUtils = window.require('WAWebUploadManager');
    window.WA.WAWebStreamModel = window.require('WAWebStreamModel');
    window.WA.FindOrCreateChat = window.require('WAWebFindChatAction');
    window.WA.CustomerNoteUtils = window.require('WAWebNoteAction');
    window.WA.BusinessGatingUtils = window.require('WAWebBizGatingUtils');
    window.WA.PollsVotesSchema = require('WAWebPollsVotesSchema');

    window.WA.Settings = {
        ...window.require('WAWebUserPrefsGeneral'),
        ...window.require('WAWebUserPrefsNotifications'),
        setPushname: window.require('WAWebSetPushnameConnAction').setPushname,
    };
    window.WA.NumberInfo = {
        ...window.require('WAPhoneUtils'),
        ...window.require('WAPhoneFindCC'),
    };
    window.WA.ForwardUtils = {
        ...window.require('WAWebChatForwardMessage'),
    };
    window.WA.PinnedMsgUtils = {
        ...window.require('WAWebPinInChatSchema'),
        ...window.require('WAWebSendPinMessageAction')
    };
    window.WA.ScheduledEventMsgUtils = {
        ...window.require('WAWebGenerateEventCallLink'),
        ...window.require('WAWebSendEventEditMsgAction'),
        ...window.require('WAWebSendEventResponseMsgAction'),
    };
    window.WA.VCard = {
        ...window.require('WAWebFrontendVcardUtils'),
        ...window.require('WAWebVcardParsingUtils'),
        ...window.require('WAWebVcardGetNameFromParsed'),
    };
    window.WA.StickerTools = {
        ...window.require('WAWebImageUtils'),
        ...window.require('WAWebAddWebpMetadata'),
    };
    window.WA.GroupUtils = {
        ...window.require('WAWebGroupCreateJob'),
        ...window.require('WAWebGroupModifyInfoJob'),
        ...window.require('WAWebExitGroupAction'),
        ...window.require('WAWebContactProfilePicThumbBridge'),
        ...window.require('WAWebSetPropertyGroupAction')
    };
    window.WA.GroupParticipants = {
        ...window.require('WAWebModifyParticipantsGroupAction'),
        ...window.require('WASmaxGroupsAddParticipantsRPC'),
    };
    window.WA.GroupInvite = {
        ...window.require('WAWebGroupInviteJob'),
        ...window.require('WAWebGroupQueryJob'),
        ...window.require('WAWebMexFetchGroupInviteCodeJob'),
    };
    window.WA.GroupInviteV4 = {
        ...window.require('WAWebGroupInviteV4Job'),
        ...window.require('WAWebChatSendMessages'),
    };
    window.WA.MembershipRequestUtils = {
        ...window.require('WAWebApiMembershipApprovalRequestStore'),
        ...window.require('WASmaxGroupsMembershipRequestsActionRPC'),
    };
    window.WA.ChannelUtils = {
        ...window.require('WAWebLoadNewsletterPreviewChatAction'),
        ...window.require('WAWebNewsletterMetadataQueryJob'),
        ...window.require('WAWebNewsletterCreateQueryJob'),
        ...window.require('WAWebEditNewsletterMetadataAction'),
        ...window.require('WAWebNewsletterDeleteAction'),
        ...window.require('WAWebNewsletterSubscribeAction'),
        ...window.require('WAWebNewsletterUnsubscribeAction'),
        ...window.require('WAWebNewsletterDirectorySearchAction'),
        ...window.require('WAWebNewsletterToggleMuteStateJob'),
        ...window.require('WAWebNewsletterGatingUtils'),
        ...window.require('WAWebNewsletterModelUtils'),
        ...window.require('WAWebMexAcceptNewsletterAdminInviteJob'),
        ...window.require('WAWebMexRevokeNewsletterAdminInviteJob'),
        ...window.require('WAWebChangeNewsletterOwnerAction'),
        ...window.require('WAWebDemoteNewsletterAdminAction'),
        ...window.require('WAWebNewsletterDemoteAdminJob'),
        countryCodesIso: window.require('WAWebCountriesNativeCountryNames'),
        currentRegion: window.require('WAWebL10N').getRegion(),
    };
    window.WA.SendChannelMessage = {
        ...window.require('WAWebNewsletterUpdateMsgsRecordsJob'),
        ...window.require('WAWebMsgDataFromModel'),
        ...window.require('WAWebNewsletterSendMessageJob'),
        ...window.require('WAWebNewsletterSendMsgAction'),
        ...window.require('WAMediaCalculateFilehash'),
    };
    window.WA.ChannelSubscribers = {
        ...window.require('WAWebMexFetchNewsletterSubscribersJob'),
        ...window.require('WAWebNewsletterSubscriberListAction'),
    };
    window.WA.AddressbookContactUtils = {
        ...window.require('WAWebSaveContactAction'),
        ...window.require('WAWebDeleteContactAction'),
    };

    // window.Store and window.WA now point to the same object, no copying needed

    if (!window.Store.Chat._find || !window.Store.Chat.findImpl) {
        window.Store.Chat._find = (e) => {
            const target = window.Store.Chat.get(e);
            return target
                ? Promise.resolve(target)
                : Promise.resolve({
                    id: e,
                });
        };
        window.Store.Chat.findImpl = window.Store.Chat._find;
    }

    /**
     * Target options object description
     * @typedef {Object} TargetOptions
     * @property {string|number} module The target module
     * @property {string} function The function name to get from a module
     */
    /**
     * Function to modify functions
     * @param {TargetOptions} target Options specifying the target function to search for modifying
     * @param {Function} callback Modified function
     */
    window.injectToFunction = (target, callback) => {
        try {
            let module = window.require(target.module);
            if (!module) return; 

            const path = target.function.split('.');
            const funcName = path.pop();

            for (const key of path) {
                if (!module[key]) return;
                module = module[key];
            }

            const originalFunction = module[funcName];
            if (typeof originalFunction !== 'function') return;

            module[funcName] = (...args) => {
                try {
                    return callback(originalFunction, ...args);
                } catch {
                    return originalFunction(...args);
                }
            };

        } catch {
            return;
        }
    };

    window.injectToFunction(
        { module: 'WAWebBackendJobsCommon', function: 'mediaTypeFromProtobuf' },
        (func, ...args) => {
            const [proto] = args;
            return proto.locationMessage ? null : func(...args);
        },
    );

    window.injectToFunction({ module: 'WAWebE2EProtoUtils', function: 'typeAttributeFromProtobuf' }, (func, ...args) => { const [proto] = args; return proto.locationMessage || proto.groupInviteMessage ? 'text' : func(...args); });
};
