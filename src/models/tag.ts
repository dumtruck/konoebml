import type {
  EbmlBlockTagIdType,
  EbmlElementType,
  EbmlSimpleBlockTagIdType,
  EbmlTagIdEnum,
  EbmlTagPosition,
} from './enums';
import type { EbmlBlockTag } from './tag-block';
import type { EbmlDataTag } from './tag-data';
import type { EbmlMasterTag } from './tag-master';
import type { EbmlSimpleBlockTag } from './tag-simple-block';

export type EbmlTagExcludeField =
  | 'id'
  | 'position'
  | 'parent'
  | 'type'
  | 'data'
  | 'children';

export interface EbmlUintTagTypeBase
  extends Omit<EbmlDataTag, EbmlTagExcludeField> {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.UnsignedInt;
  data: number | bigint;
  children?: [];
}

export interface EbmlTrackTypeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackType;
}

export interface EbmlFlagDefaultTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagDefault;
}
export interface EbmlChapterTrackNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterTrackNumber;
}
export interface EbmlChapterTimeStartTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterTimeStart;
}
export interface EbmlChapterTimeEndTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterTimeEnd;
}
export interface EbmlCueRefTimeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueRefTime;
}
export interface EbmlCueRefClusterTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueRefCluster;
}
export interface EbmlChapterFlagHiddenTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterFlagHidden;
}
export interface EbmlContentCompAlgoTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ContentCompAlgo;
}
export interface EbmlDocTypeReadVersionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DocTypeReadVersion;
}
export interface EbmlEBMLVersionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EBMLVersion;
}
export interface EbmlDocTypeVersionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DocTypeVersion;
}
export interface EbmlTagDefaultTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TagDefault;
}
export interface EbmlChapterFlagEnabledTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterFlagEnabled;
}
export interface EbmlFileUsedStartTimeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FileUsedStartTime;
}
export interface EbmlFileUsedEndTimeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FileUsedEndTime;
}
export interface EbmlContentEncodingOrderTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ContentEncodingOrder;
}
export interface EbmlContentEncodingScopeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ContentEncodingScope;
}
export interface EbmlContentEncodingTypeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ContentEncodingType;
}
export interface EbmlCueBlockNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueBlockNumber;
}
export interface EbmlBitDepthTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.BitDepth;
}
export interface EbmlChapProcessTimeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapProcessTime;
}
export interface EbmlChapProcessCodecIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapProcessCodecID;
}
export interface EbmlAttachmentLinkTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.AttachmentLink;
}
export interface EbmlTagAttachmentUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TagAttachmentUID;
}
export interface EbmlTagChapterUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TagChapterUID;
}
export interface EbmlTagEditionUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TagEditionUID;
}
export interface EbmlTagTrackUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TagTrackUID;
}
export interface EbmlTargetTypeValueTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TargetTypeValue;
}
export interface EbmlChapterPhysicalEquivTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterPhysicalEquiv;
}
export interface EbmlChapterSegmentEditionUIDTagType
  extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterSegmentEditionUID;
}
export interface EbmlChapterUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterUID;
}
export interface EbmlEditionFlagOrderedTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EditionFlagOrdered;
}
export interface EbmlEditionFlagDefaultTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EditionFlagDefault;
}
export interface EbmlEditionFlagHiddenTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EditionFlagHidden;
}
export interface EbmlEditionUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EditionUID;
}
export interface EbmlFileUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FileUID;
}
export interface EbmlCueRefCodecStateTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueRefCodecState;
}
export interface EbmlCueRefNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueRefNumber;
}
export interface EbmlCueCodecStateTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueCodecState;
}
export interface EbmlCueDurationTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueDuration;
}
export interface EbmlCueRelativePositionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueRelativePosition;
}
export interface EbmlCueClusterPositionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueClusterPosition;
}
export interface EbmlCueTrackTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueTrack;
}
export interface EbmlCueTimeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueTime;
}
export interface EbmlAESSettingsCipherModeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.AESSettingsCipherMode;
}
export interface EbmlContentSigHashAlgoTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ContentSigHashAlgo;
}
export interface EbmlContentSigAlgoTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ContentSigAlgo;
}
export interface EbmlContentEncAlgoTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ContentEncAlgo;
}
export interface EbmlTrickMasterTrackUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrickMasterTrackUID;
}
export interface EbmlTrickTrackFlagTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrickTrackFlag;
}
export interface EbmlTrickTrackUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrickTrackUID;
}
export interface EbmlTrackJoinUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackJoinUID;
}
export interface EbmlTrackPlaneTypeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackPlaneType;
}
export interface EbmlTrackPlaneUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackPlaneUID;
}
export interface EbmlChannelsTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.Channels;
}
export interface EbmlAspectRatioTypeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.AspectRatioType;
}
export interface EbmlDisplayUnitTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DisplayUnit;
}
export interface EbmlDisplayHeightTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DisplayHeight;
}
export interface EbmlDisplayWidthTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DisplayWidth;
}
export interface EbmlPixelCropRightTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelCropRight;
}
export interface EbmlPixelCropLeftTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelCropLeft;
}
export interface EbmlPixelCropTopTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelCropTop;
}
export interface EbmlPixelCropBottomTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelCropBottom;
}
export interface EbmlPixelHeightTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelHeight;
}
export interface EbmlPixelWidthTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelWidth;
}
export interface EbmlOldStereoModeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.OldStereoMode;
}
export interface EbmlAlphaModeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.AlphaMode;
}
export interface EbmlStereoModeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.StereoMode;
}
export interface EbmlFlagInterlacedTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagInterlaced;
}
export interface EbmlTrackTranslateCodecTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackTranslateCodec;
}
export interface EbmlTrackTranslateEditionUIDTagType
  extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackTranslateEditionUID;
}
export interface EbmlSeekPreRollTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SeekPreRoll;
}
export interface EbmlCodecDelayTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CodecDelay;
}
export interface EbmlTrackOverlayTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackOverlay;
}
export interface EbmlCodecDecodeAllTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CodecDecodeAll;
}
export interface EbmlMaxBlockAdditionIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.MaxBlockAdditionID;
}
export interface EbmlDefaultDecodedFieldDurationTagType
  extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DefaultDecodedFieldDuration;
}
export interface EbmlDefaultDurationTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DefaultDuration;
}
export interface EbmlMaxCacheTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.MaxCache;
}
export interface EbmlMinCacheTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.MinCache;
}
export interface EbmlFlagLacingTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagLacing;
}
export interface EbmlFlagForcedTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagForced;
}
export interface EbmlFlagEnabledTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagEnabled;
}
export interface EbmlTrackUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackUID;
}
export interface EbmlTrackNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackNumber;
}
export interface EbmlReferenceTimeCodeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ReferenceTimeCode;
}
export interface EbmlReferenceOffsetTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ReferenceOffset;
}
export interface EbmlSliceDurationTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SliceDuration;
}
export interface EbmlDelayTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.Delay;
}
export interface EbmlBlockAdditionIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.BlockAdditionID;
}
export interface EbmlFrameNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FrameNumber;
}
export interface EbmlLaceNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.LaceNumber;
}
export interface EbmlReferencePriorityTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ReferencePriority;
}
export interface EbmlBlockDurationTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.BlockDuration;
}
export interface EbmlBlockAddIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.BlockAddID;
}
export interface EbmlPrevSizeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PrevSize;
}
export interface EbmlPositionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.Position;
}
export interface EbmlSilentTrackNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SilentTrackNumber;
}
export interface EbmlTimecodeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.Timecode;
}
export interface EbmlTimecodeScaleDenominatorTagType
  extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TimecodeScaleDenominator;
}
export interface EbmlTimecodeScaleTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TimecodeScale;
}
export interface EbmlChapterTranslateCodecTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterTranslateCodec;
}
export interface EbmlChapterTranslateEditionUIDTagType
  extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterTranslateEditionUID;
}
export interface EbmlSeekPositionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SeekPosition;
}
export interface EbmlSignatureHashTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SignatureHash;
}
export interface EbmlSignatureAlgoTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SignatureAlgo;
}
export interface EbmlEBMLMaxSizeLengthTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EBMLMaxSizeLength;
}
export interface EbmlEBMLMaxIDLengthTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EBMLMaxIDLength;
}
export interface EbmlEBMLReadVersionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EBMLReadVersion;
}

export type EbmlUintTagType =
  | EbmlTrackTypeTagType
  | EbmlFlagDefaultTagType
  | EbmlChapterTrackNumberTagType
  | EbmlChapterTimeStartTagType
  | EbmlChapterTimeEndTagType
  | EbmlCueRefTimeTagType
  | EbmlCueRefClusterTagType
  | EbmlChapterFlagHiddenTagType
  | EbmlContentCompAlgoTagType
  | EbmlDocTypeReadVersionTagType
  | EbmlEBMLVersionTagType
  | EbmlDocTypeVersionTagType
  | EbmlTagDefaultTagType
  | EbmlChapterFlagEnabledTagType
  | EbmlFileUsedStartTimeTagType
  | EbmlFileUsedEndTimeTagType
  | EbmlContentEncodingOrderTagType
  | EbmlContentEncodingScopeTagType
  | EbmlContentEncodingTypeTagType
  | EbmlCueBlockNumberTagType
  | EbmlBitDepthTagType
  | EbmlChapProcessTimeTagType
  | EbmlChapProcessCodecIDTagType
  | EbmlAttachmentLinkTagType
  | EbmlTagAttachmentUIDTagType
  | EbmlTagChapterUIDTagType
  | EbmlTagEditionUIDTagType
  | EbmlTagTrackUIDTagType
  | EbmlTargetTypeValueTagType
  | EbmlChapterPhysicalEquivTagType
  | EbmlChapterSegmentEditionUIDTagType
  | EbmlChapterUIDTagType
  | EbmlEditionFlagOrderedTagType
  | EbmlEditionFlagDefaultTagType
  | EbmlEditionFlagHiddenTagType
  | EbmlEditionUIDTagType
  | EbmlFileUIDTagType
  | EbmlCueRefCodecStateTagType
  | EbmlCueRefNumberTagType
  | EbmlCueCodecStateTagType
  | EbmlCueDurationTagType
  | EbmlCueRelativePositionTagType
  | EbmlCueClusterPositionTagType
  | EbmlCueTrackTagType
  | EbmlCueTimeTagType
  | EbmlAESSettingsCipherModeTagType
  | EbmlContentSigHashAlgoTagType
  | EbmlContentSigAlgoTagType
  | EbmlContentEncAlgoTagType
  | EbmlTrickMasterTrackUIDTagType
  | EbmlTrickTrackFlagTagType
  | EbmlTrickTrackUIDTagType
  | EbmlTrackJoinUIDTagType
  | EbmlTrackPlaneTypeTagType
  | EbmlTrackPlaneUIDTagType
  | EbmlChannelsTagType
  | EbmlAspectRatioTypeTagType
  | EbmlDisplayUnitTagType
  | EbmlDisplayHeightTagType
  | EbmlDisplayWidthTagType
  | EbmlPixelCropRightTagType
  | EbmlPixelCropLeftTagType
  | EbmlPixelCropTopTagType
  | EbmlPixelCropBottomTagType
  | EbmlPixelHeightTagType
  | EbmlPixelWidthTagType
  | EbmlOldStereoModeTagType
  | EbmlAlphaModeTagType
  | EbmlStereoModeTagType
  | EbmlFlagInterlacedTagType
  | EbmlTrackTranslateCodecTagType
  | EbmlTrackTranslateEditionUIDTagType
  | EbmlSeekPreRollTagType
  | EbmlCodecDelayTagType
  | EbmlTrackOverlayTagType
  | EbmlCodecDecodeAllTagType
  | EbmlMaxBlockAdditionIDTagType
  | EbmlDefaultDecodedFieldDurationTagType
  | EbmlDefaultDurationTagType
  | EbmlMaxCacheTagType
  | EbmlMinCacheTagType
  | EbmlFlagLacingTagType
  | EbmlFlagForcedTagType
  | EbmlFlagEnabledTagType
  | EbmlTrackUIDTagType
  | EbmlTrackNumberTagType
  | EbmlReferenceTimeCodeTagType
  | EbmlReferenceOffsetTagType
  | EbmlSliceDurationTagType
  | EbmlDelayTagType
  | EbmlBlockAdditionIDTagType
  | EbmlFrameNumberTagType
  | EbmlLaceNumberTagType
  | EbmlReferencePriorityTagType
  | EbmlBlockDurationTagType
  | EbmlBlockAddIDTagType
  | EbmlPrevSizeTagType
  | EbmlPositionTagType
  | EbmlSilentTrackNumberTagType
  | EbmlTimecodeTagType
  | EbmlTimecodeScaleDenominatorTagType
  | EbmlTimecodeScaleTagType
  | EbmlChapterTranslateCodecTagType
  | EbmlChapterTranslateEditionUIDTagType
  | EbmlSeekPositionTagType
  | EbmlSignatureHashTagType
  | EbmlSignatureAlgoTagType
  | EbmlEBMLMaxSizeLengthTagType
  | EbmlEBMLMaxIDLengthTagType
  | EbmlEBMLReadVersionTagType;

export interface EbmlIntTagTypeBase
  extends Omit<EbmlDataTag, EbmlTagExcludeField> {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Integer;
  data: number | bigint;
  children?: [];
}

export interface EbmlTrackOffsetTagType extends EbmlIntTagTypeBase {
  id: EbmlTagIdEnum.TrackOffset;
}
export interface EbmlDiscardPaddingTagType extends EbmlIntTagTypeBase {
  id: EbmlTagIdEnum.DiscardPadding;
}
export interface EbmlReferenceVirtualTagType extends EbmlIntTagTypeBase {
  id: EbmlTagIdEnum.ReferenceVirtual;
}
export interface EbmlReferenceBlockTagType extends EbmlIntTagTypeBase {
  id: EbmlTagIdEnum.ReferenceBlock;
}

export type EbmlIntTagType =
  | EbmlTrackOffsetTagType
  | EbmlDiscardPaddingTagType
  | EbmlReferenceVirtualTagType
  | EbmlReferenceBlockTagType;

export interface EbmlAsciiTagTypeBase
  extends Omit<EbmlDataTag, EbmlTagExcludeField> {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Ascii;
  data: string;
  children?: [];
}

export interface EbmlCodecIDTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.CodecID;
}
export interface EbmlDocTypeTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.DocType;
}
export interface EbmlFileMimeTypeTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.FileMimeType;
}
export interface EbmlTagLanguageTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.TagLanguage;
}
export interface EbmlTargetTypeTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.TargetType;
}
export interface EbmlChapCountryTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.ChapCountry;
}
export interface EbmlChapLanguageTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.ChapLanguage;
}
export interface EbmlCodecDownloadURLTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.CodecDownloadURL;
}
export interface EbmlCodecInfoURLTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.CodecInfoURL;
}
export interface EbmlLanguageTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.Language;
}

export type EbmlAsciiTagType =
  | EbmlCodecIDTagType
  | EbmlDocTypeTagType
  | EbmlFileMimeTypeTagType
  | EbmlTagLanguageTagType
  | EbmlTargetTypeTagType
  | EbmlChapCountryTagType
  | EbmlChapLanguageTagType
  | EbmlCodecDownloadURLTagType
  | EbmlCodecInfoURLTagType
  | EbmlLanguageTagType;

export type EbmlUtf8TagTypeBase = Omit<EbmlDataTag, EbmlTagExcludeField> & {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.UTF8;
  data: string;
  children?: [];
};

export interface EbmlChapStringTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.ChapString;
}
export interface EbmlTagStringTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.TagString;
}
export interface EbmlChapterStringUIDTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.ChapterStringUID;
}
export interface EbmlWritingAppTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.WritingApp;
}
export interface EbmlSegmentFilenameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.SegmentFilename;
}
export interface EbmlCodecNameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.CodecName;
}
export interface EbmlTagNameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.TagName;
}
export interface EbmlFileNameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.FileName;
}
export interface EbmlFileDescriptionTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.FileDescription;
}
export interface EbmlCodecSettingsTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.CodecSettings;
}
export interface EbmlNameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.Name;
}
export interface EbmlMuxingAppTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.MuxingApp;
}
export interface EbmlTitleTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.Title;
}
export interface EbmlNextFilenameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.NextFilename;
}
export interface EbmlPrevFilenameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.PrevFilename;
}

export type EbmlUtf8TagType =
  | EbmlChapStringTagType
  | EbmlTagStringTagType
  | EbmlChapterStringUIDTagType
  | EbmlWritingAppTagType
  | EbmlSegmentFilenameTagType
  | EbmlCodecNameTagType
  | EbmlTagNameTagType
  | EbmlFileNameTagType
  | EbmlFileDescriptionTagType
  | EbmlCodecSettingsTagType
  | EbmlNameTagType
  | EbmlMuxingAppTagType
  | EbmlTitleTagType
  | EbmlNextFilenameTagType
  | EbmlPrevFilenameTagType;

export type EbmlDateTagTypeBase = Omit<EbmlDataTag, EbmlTagExcludeField> & {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Date;
  data: Uint8Array;
  children?: [];
};

export interface EbmlDateUTCTagType extends EbmlDateTagTypeBase {
  id: EbmlTagIdEnum.DateUTC;
}

export type EbmlDateTagType = EbmlDateUTCTagType;

export interface EbmlFloatTagTypeBase
  extends Omit<EbmlDataTag, EbmlTagExcludeField> {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Float;
  data: number;
  children?: [];
}

export interface EbmlDurationTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.Duration;
}
export interface EbmlOutputSamplingFrequencyTagType
  extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.OutputSamplingFrequency;
}
export interface EbmlSamplingFrequencyTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.SamplingFrequency;
}
export interface EbmlFrameRateTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.FrameRate;
}
export interface EbmlGammaValueTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.GammaValue;
}
export interface EbmlTrackTimecodeScaleTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.TrackTimecodeScale;
}

export type EbmlFloatTagType =
  | EbmlDurationTagType
  | EbmlOutputSamplingFrequencyTagType
  | EbmlSamplingFrequencyTagType
  | EbmlFrameRateTagType
  | EbmlGammaValueTagType
  | EbmlTrackTimecodeScaleTagType;

export interface EbmlBinaryTagTypeBase
  extends Omit<EbmlDataTag, EbmlTagExcludeField> {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Binary;
  data: Uint8Array;
  children?: [];
}

export interface EbmlContentCompSettingsTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ContentCompSettings;
}
export interface EbmlSegmentFamilyTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.SegmentFamily;
}
export interface EbmlTagBinaryTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.TagBinary;
}
export interface EbmlFileReferralTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.FileReferral;
}
export interface EbmlSignedElementTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.SignedElement;
}
export interface EbmlChapProcessDataTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ChapProcessData;
}
export interface EbmlChapProcessPrivateTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ChapProcessPrivate;
}
export interface EbmlChapterSegmentUIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ChapterSegmentUID;
}
export interface EbmlFileDataTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.FileData;
}
export interface EbmlContentSigKeyIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ContentSigKeyID;
}
export interface EbmlContentSignatureTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ContentSignature;
}
export interface EbmlContentEncKeyIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ContentEncKeyID;
}
export interface EbmlTrickMasterTrackSegmentUIDTagType
  extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.TrickMasterTrackSegmentUID;
}
export interface EbmlTrickTrackSegmentUIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.TrickTrackSegmentUID;
}
export interface EbmlChannelPositionsTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ChannelPositions;
}
export interface EbmlColourSpaceTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ColourSpace;
}
export interface EbmlTrackTranslateTrackIDTagType
  extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.TrackTranslateTrackID;
}
export interface EbmlCodecPrivateTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.CodecPrivate;
}
export interface EbmlEncryptedBlockTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.EncryptedBlock;
}
export interface EbmlCodecStateTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.CodecState;
}
export interface EbmlBlockAdditionalTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.BlockAdditional;
}
export interface EbmlBlockVirtualTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.BlockVirtual;
}
export interface EbmlChapterTranslateIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ChapterTranslateID;
}
export interface EbmlNextUIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.NextUID;
}
export interface EbmlPrevUIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.PrevUID;
}
export interface EbmlSegmentUIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.SegmentUID;
}
export interface EbmlSeekIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.SeekID;
}
export interface EbmlSignatureTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.Signature;
}
export interface EbmlSignaturePublicKeyTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.SignaturePublicKey;
}
export interface EbmlCRC32TagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.CRC32;
}
export interface EbmlVoidTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.Void;
}

export type EbmlBinaryTagType =
  | EbmlContentCompSettingsTagType
  | EbmlSegmentFamilyTagType
  | EbmlTagBinaryTagType
  | EbmlFileReferralTagType
  | EbmlSignedElementTagType
  | EbmlChapProcessDataTagType
  | EbmlChapProcessPrivateTagType
  | EbmlChapterSegmentUIDTagType
  | EbmlFileDataTagType
  | EbmlContentSigKeyIDTagType
  | EbmlContentSignatureTagType
  | EbmlContentEncKeyIDTagType
  | EbmlTrickMasterTrackSegmentUIDTagType
  | EbmlTrickTrackSegmentUIDTagType
  | EbmlChannelPositionsTagType
  | EbmlColourSpaceTagType
  | EbmlTrackTranslateTrackIDTagType
  | EbmlCodecPrivateTagType
  | EbmlEncryptedBlockTagType
  | EbmlCodecStateTagType
  | EbmlBlockAdditionalTagType
  | EbmlBlockVirtualTagType
  | EbmlChapterTranslateIDTagType
  | EbmlNextUIDTagType
  | EbmlPrevUIDTagType
  | EbmlSegmentUIDTagType
  | EbmlSeekIDTagType
  | EbmlSignatureTagType
  | EbmlSignaturePublicKeyTagType
  | EbmlCRC32TagType
  | EbmlVoidTagType;

export type EbmlDataTagType =
  | EbmlAsciiTagType
  | EbmlBinaryTagType
  | EbmlUintTagType
  | EbmlIntTagType
  | EbmlFloatTagType
  | EbmlDateTagType
  | EbmlUtf8TagType;

export type EbmlUnknownTagType = Omit<EbmlDataTag, EbmlTagExcludeField> & {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type?: undefined;
  data: Uint8Array;
  children?: [];
};

export type EbmlBlockTagType = Omit<EbmlBlockTag, EbmlTagExcludeField> & {
  id: EbmlBlockTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type?: undefined;
  data?: undefined;
  children?: [];
};

export type EbmlSimpleBlockTagType = Omit<
  EbmlSimpleBlockTag,
  EbmlTagExcludeField
> & {
  id: EbmlSimpleBlockTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type?: undefined;
  data?: undefined;
  children?: [];
};

export interface EbmlMasterTagTypeBase
  extends Omit<EbmlMasterTag, EbmlTagExcludeField> {
  type: EbmlElementType.Master;
  position: EbmlTagPosition.Start | EbmlTagPosition.End;
  parent?: EbmlMasterTag;
  children: EbmlTagType[];
  data?: undefined;
}

export interface EbmlChapterDisplayTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapterDisplay;
}
export interface EbmlContentCompressionTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ContentCompression;
}
export interface EbmlContentEncryptionTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ContentEncryption;
}
export interface EbmlSilentTracksTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SilentTracks;
}
export interface EbmlContentEncodingTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ContentEncoding;
}
export interface EbmlTrackTranslateTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackTranslate;
}
export interface EbmlChapProcessCommandTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapProcessCommand;
}
export interface EbmlChapterTranslateTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapterTranslate;
}
export interface EbmlChapProcessTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapProcess;
}
export interface EbmlTagTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Tag;
}
export interface EbmlSegmentTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Segment;
}
export interface EbmlSimpleTagTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SimpleTag;
}
export interface EbmlTargetsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Targets;
}
export interface EbmlTagsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Tags;
}
export interface EbmlChapterTrackTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapterTrack;
}
export interface EbmlChapterAtomTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapterAtom;
}
export interface EbmlEditionEntryTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.EditionEntry;
}
export interface EbmlChaptersTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Chapters;
}
export interface EbmlAttachedFileTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.AttachedFile;
}
export interface EbmlAttachmentsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Attachments;
}
export interface EbmlCueReferenceTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.CueReference;
}
export interface EbmlCueTrackPositionsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.CueTrackPositions;
}
export interface EbmlCuePointTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.CuePoint;
}
export interface EbmlCuesTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Cues;
}
export interface EbmlContentEncAESSettingsTagType
  extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ContentEncAESSettings;
}
export interface EbmlContentEncodingsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ContentEncodings;
}
export interface EbmlTrackJoinBlocksTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackJoinBlocks;
}
export interface EbmlTrackPlaneTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackPlane;
}
export interface EbmlTrackCombinePlanesTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackCombinePlanes;
}
export interface EbmlTrackOperationTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackOperation;
}
export interface EbmlAudioTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Audio;
}
export interface EbmlVideoTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Video;
}
export interface EbmlTrackEntryTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackEntry;
}
export interface EbmlTracksTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Tracks;
}
export interface EbmlReferenceFrameTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ReferenceFrame;
}
export interface EbmlTimeSliceTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TimeSlice;
}
export interface EbmlSlicesTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Slices;
}
export interface EbmlBlockMoreTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.BlockMore;
}
export interface EbmlBlockAdditionsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.BlockAdditions;
}
export interface EbmlBlockGroupTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.BlockGroup;
}
export interface EbmlClusterTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Cluster;
}
export interface EbmlInfoTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Info;
}
export interface EbmlSeekTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Seek;
}
export interface EbmlSeekHeadTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SeekHead;
}
export interface EbmlSignatureElementListTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SignatureElementList;
}
export interface EbmlSignatureElementsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SignatureElements;
}
export interface EbmlSignatureSlotTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SignatureSlot;
}
export interface EbmlEBMLTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.EBML;
}

export type EbmlMasterTagType =
  | EbmlChapterDisplayTagType
  | EbmlContentCompressionTagType
  | EbmlContentEncryptionTagType
  | EbmlSilentTracksTagType
  | EbmlContentEncodingTagType
  | EbmlTrackTranslateTagType
  | EbmlChapProcessCommandTagType
  | EbmlChapterTranslateTagType
  | EbmlChapProcessTagType
  | EbmlTagTagType
  | EbmlSegmentTagType
  | EbmlSimpleTagTagType
  | EbmlTargetsTagType
  | EbmlTagsTagType
  | EbmlChapterTrackTagType
  | EbmlChapterAtomTagType
  | EbmlEditionEntryTagType
  | EbmlChaptersTagType
  | EbmlAttachedFileTagType
  | EbmlAttachmentsTagType
  | EbmlCueReferenceTagType
  | EbmlCueTrackPositionsTagType
  | EbmlCuePointTagType
  | EbmlCuesTagType
  | EbmlContentEncAESSettingsTagType
  | EbmlContentEncodingsTagType
  | EbmlTrackJoinBlocksTagType
  | EbmlTrackPlaneTagType
  | EbmlTrackCombinePlanesTagType
  | EbmlTrackOperationTagType
  | EbmlAudioTagType
  | EbmlVideoTagType
  | EbmlTrackEntryTagType
  | EbmlTracksTagType
  | EbmlReferenceFrameTagType
  | EbmlTimeSliceTagType
  | EbmlSlicesTagType
  | EbmlBlockMoreTagType
  | EbmlBlockAdditionsTagType
  | EbmlBlockGroupTagType
  | EbmlClusterTagType
  | EbmlInfoTagType
  | EbmlSeekTagType
  | EbmlSeekHeadTagType
  | EbmlSignatureElementListTagType
  | EbmlSignatureElementsTagType
  | EbmlSignatureSlotTagType
  | EbmlEBMLTagType;

export type EbmlTagType =
  | EbmlMasterTagType
  | EbmlSimpleBlockTagType
  | EbmlBlockTagType
  | EbmlDataTagType;
