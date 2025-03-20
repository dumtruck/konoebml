import type {
  EbmlSimpleBlockTagIdType,
  EbmlBlockTagIdType,
  EbmlElementType,
  EbmlTagIdEnum,
  EbmlTagPosition,
} from './enums';
import type { EbmlDataTag } from './tag-data';
import type { EbmlMasterTag } from './tag-master';
import type { EbmlSimpleBlockTag } from './tag-simple-block';
import type { EbmlBlockTag } from './tag-block';

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
  type: EbmlElementType.Uint;
  data: number | bigint;
  children?: [];
}

export interface EbmlIntTagTypeBase
  extends Omit<EbmlDataTag, EbmlTagExcludeField> {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Int;
  data: number | bigint;
  children?: [];
}

export interface EbmlAsciiTagTypeBase
  extends Omit<EbmlDataTag, EbmlTagExcludeField> {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Ascii;
  data: string;
  children?: [];
}

export interface EbmlUtf8TagTypeBase
  extends Omit<EbmlDataTag, EbmlTagExcludeField> {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Utf8;
  data: undefined;
  children?: [];
}

export interface EbmlBinaryTagTypeBase
  extends Omit<EbmlDataTag, EbmlTagExcludeField> {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Binary;
  data: Uint8Array;
  children?: [];
}

export interface EbmlFloatTagTypeBase
  extends Omit<EbmlDataTag, EbmlTagExcludeField> {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Float;
  data: number;
  children?: [];
}

export interface EbmlDateTagTypeBase
  extends Omit<EbmlDataTag, EbmlTagExcludeField> {
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Date;
  data: Uint8Array;
  children?: [];
}

export interface EbmlMasterTagTypeBase
  extends Omit<EbmlMasterTag, EbmlTagExcludeField> {
  type: EbmlElementType.Master;
  position: EbmlTagPosition.Start | EbmlTagPosition.End;
  parent?: EbmlMasterTag;
  children: EbmlTagType[];
  data?: undefined;
}

export interface EbmlEBMLTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.EBML;
}

export interface EbmlSignatureSlotTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SignatureSlot;
}

export interface EbmlSignatureElementsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SignatureElements;
}

export interface EbmlSignatureElementListTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SignatureElementList;
}

export interface EbmlSegmentTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Segment;
}

export interface EbmlSeekHeadTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SeekHead;
}

export interface EbmlSeekTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Seek;
}

export interface EbmlInfoTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Info;
}

export interface EbmlChapterTranslateTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapterTranslate;
}

export interface EbmlClusterTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Cluster;
}

export interface EbmlSilentTracksTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SilentTracks;
}

export interface EbmlBlockGroupTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.BlockGroup;
}

export interface EbmlBlockAdditionsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.BlockAdditions;
}

export interface EbmlBlockMoreTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.BlockMore;
}

export interface EbmlSlicesTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Slices;
}

export interface EbmlTimeSliceTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TimeSlice;
}

export interface EbmlReferenceFrameTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ReferenceFrame;
}

export interface EbmlTracksTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Tracks;
}

export interface EbmlTrackEntryTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackEntry;
}

export interface EbmlTrackTranslateTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackTranslate;
}

export interface EbmlVideoTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Video;
}

export interface EbmlAudioTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Audio;
}

export interface EbmlTrackOperationTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackOperation;
}

export interface EbmlTrackCombinePlanesTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackCombinePlanes;
}

export interface EbmlTrackPlaneTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackPlane;
}

export interface EbmlTrackJoinBlocksTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.TrackJoinBlocks;
}

export interface EbmlContentEncodingsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ContentEncodings;
}

export interface EbmlContentEncodingTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ContentEncoding;
}

export interface EbmlContentCompressionTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ContentCompression;
}

export interface EbmlContentEncryptionTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ContentEncryption;
}

export interface EbmlCuesTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Cues;
}

export interface EbmlCuePointTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.CuePoint;
}

export interface EbmlCueTrackPositionsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.CueTrackPositions;
}

export interface EbmlCueReferenceTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.CueReference;
}

export interface EbmlAttachmentsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Attachments;
}

export interface EbmlAttachedFileTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.AttachedFile;
}

export interface EbmlChaptersTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Chapters;
}

export interface EbmlEditionEntryTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.EditionEntry;
}

export interface EbmlChapterAtomTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapterAtom;
}

export interface EbmlChapterTrackTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapterTrack;
}

export interface EbmlChapterDisplayTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapterDisplay;
}

export interface EbmlChapProcessTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapProcess;
}

export interface EbmlChapProcessCommandTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ChapProcessCommand;
}

export interface EbmlTagsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Tags;
}

export interface EbmlTagTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Tag;
}

export interface EbmlTargetsTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Targets;
}

export interface EbmlSimpleTagTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.SimpleTag;
}

export interface EbmlDocTypeExtensionTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.DocTypeExtension;
}

export interface EbmlBlockAdditionMappingTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.BlockAdditionMapping;
}

export interface EbmlColourTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Colour;
}

export interface EbmlMasteringMetadataTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.MasteringMetadata;
}

export interface EbmlProjectionTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.Projection;
}

export interface EbmlContentEncAESSettingsTagType
  extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.ContentEncAESSettings;
}

export interface EbmlEditionDisplayTagType extends EbmlMasterTagTypeBase {
  id: EbmlTagIdEnum.EditionDisplay;
}

export type EbmlMasterTagType =
  | EbmlEBMLTagType
  | EbmlSignatureSlotTagType
  | EbmlSignatureElementsTagType
  | EbmlSignatureElementListTagType
  | EbmlSegmentTagType
  | EbmlSeekHeadTagType
  | EbmlSeekTagType
  | EbmlInfoTagType
  | EbmlChapterTranslateTagType
  | EbmlClusterTagType
  | EbmlSilentTracksTagType
  | EbmlBlockGroupTagType
  | EbmlBlockAdditionsTagType
  | EbmlBlockMoreTagType
  | EbmlSlicesTagType
  | EbmlTimeSliceTagType
  | EbmlReferenceFrameTagType
  | EbmlTracksTagType
  | EbmlTrackEntryTagType
  | EbmlTrackTranslateTagType
  | EbmlVideoTagType
  | EbmlAudioTagType
  | EbmlTrackOperationTagType
  | EbmlTrackCombinePlanesTagType
  | EbmlTrackPlaneTagType
  | EbmlTrackJoinBlocksTagType
  | EbmlContentEncodingsTagType
  | EbmlContentEncodingTagType
  | EbmlContentCompressionTagType
  | EbmlContentEncryptionTagType
  | EbmlCuesTagType
  | EbmlCuePointTagType
  | EbmlCueTrackPositionsTagType
  | EbmlCueReferenceTagType
  | EbmlAttachmentsTagType
  | EbmlAttachedFileTagType
  | EbmlChaptersTagType
  | EbmlEditionEntryTagType
  | EbmlChapterAtomTagType
  | EbmlChapterTrackTagType
  | EbmlChapterDisplayTagType
  | EbmlChapProcessTagType
  | EbmlChapProcessCommandTagType
  | EbmlTagsTagType
  | EbmlTagTagType
  | EbmlTargetsTagType
  | EbmlSimpleTagTagType
  | EbmlDocTypeExtensionTagType
  | EbmlBlockAdditionMappingTagType
  | EbmlColourTagType
  | EbmlMasteringMetadataTagType
  | EbmlProjectionTagType
  | EbmlContentEncAESSettingsTagType
  | EbmlEditionDisplayTagType;

export interface EbmlEBMLVersionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EBMLVersion;
}

export interface EbmlEBMLReadVersionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EBMLReadVersion;
}

export interface EbmlEBMLMaxIDLengthTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EBMLMaxIDLength;
}

export interface EbmlEBMLMaxSizeLengthTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EBMLMaxSizeLength;
}

export interface EbmlDocTypeVersionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DocTypeVersion;
}

export interface EbmlDocTypeReadVersionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DocTypeReadVersion;
}

export interface EbmlSignatureAlgoTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SignatureAlgo;
}

export interface EbmlSignatureHashTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SignatureHash;
}

export interface EbmlSeekPositionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SeekPosition;
}

export interface EbmlChapterTranslateEditionUIDTagType
  extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterTranslateEditionUID;
}

export interface EbmlChapterTranslateCodecTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterTranslateCodec;
}

export interface EbmlTimestampScaleTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TimestampScale;
}

export interface EbmlTimestampTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.Timestamp;
}

export interface EbmlSilentTrackNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SilentTrackNumber;
}

export interface EbmlPositionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.Position;
}

export interface EbmlPrevSizeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PrevSize;
}

export interface EbmlBlockAddIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.BlockAddID;
}

export interface EbmlBlockDurationTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.BlockDuration;
}

export interface EbmlReferencePriorityTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ReferencePriority;
}

export interface EbmlLaceNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.LaceNumber;
}

export interface EbmlFrameNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FrameNumber;
}

export interface EbmlBlockAdditionIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.BlockAdditionID;
}

export interface EbmlDelayTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.Delay;
}

export interface EbmlSliceDurationTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SliceDuration;
}

export interface EbmlReferenceOffsetTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ReferenceOffset;
}

export interface EbmlReferenceTimestampTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ReferenceTimestamp;
}

export interface EbmlTrackNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackNumber;
}

export interface EbmlTrackUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackUID;
}

export interface EbmlTrackTypeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackType;
}

export interface EbmlFlagEnabledTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagEnabled;
}

export interface EbmlFlagDefaultTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagDefault;
}

export interface EbmlFlagForcedTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagForced;
}

export interface EbmlFlagLacingTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagLacing;
}

export interface EbmlMinCacheTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.MinCache;
}

export interface EbmlMaxCacheTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.MaxCache;
}

export interface EbmlDefaultDurationTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DefaultDuration;
}

export interface EbmlMaxBlockAdditionIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.MaxBlockAdditionID;
}

export interface EbmlAttachmentLinkTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.AttachmentLink;
}

export interface EbmlCodecDecodeAllTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CodecDecodeAll;
}

export interface EbmlTrackOverlayTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackOverlay;
}

export interface EbmlTrackTranslateEditionUIDTagType
  extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackTranslateEditionUID;
}

export interface EbmlTrackTranslateCodecTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackTranslateCodec;
}

export interface EbmlFlagInterlacedTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagInterlaced;
}

export interface EbmlStereoModeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.StereoMode;
}

export interface EbmlOldStereoModeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.OldStereoMode;
}

export interface EbmlPixelWidthTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelWidth;
}

export interface EbmlPixelHeightTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelHeight;
}

export interface EbmlPixelCropBottomTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelCropBottom;
}

export interface EbmlPixelCropTopTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelCropTop;
}

export interface EbmlPixelCropLeftTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelCropLeft;
}

export interface EbmlPixelCropRightTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.PixelCropRight;
}

export interface EbmlDisplayWidthTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DisplayWidth;
}

export interface EbmlDisplayHeightTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DisplayHeight;
}

export interface EbmlDisplayUnitTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DisplayUnit;
}

export interface EbmlAspectRatioTypeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.AspectRatioType;
}

export interface EbmlChannelsTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.Channels;
}

export interface EbmlBitDepthTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.BitDepth;
}

export interface EbmlTrackPlaneUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackPlaneUID;
}

export interface EbmlTrackPlaneTypeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackPlaneType;
}

export interface EbmlTrackJoinUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrackJoinUID;
}

export interface EbmlTrickTrackUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrickTrackUID;
}

export interface EbmlTrickTrackFlagTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrickTrackFlag;
}

export interface EbmlTrickMasterTrackUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TrickMasterTrackUID;
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

export interface EbmlContentCompAlgoTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ContentCompAlgo;
}

export interface EbmlContentEncAlgoTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ContentEncAlgo;
}

export interface EbmlContentSigAlgoTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ContentSigAlgo;
}

export interface EbmlContentSigHashAlgoTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ContentSigHashAlgo;
}

export interface EbmlCueTimeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueTime;
}

export interface EbmlCueTrackTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueTrack;
}

export interface EbmlCueClusterPositionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueClusterPosition;
}

export interface EbmlCueRelativePositionTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueRelativePosition;
}

export interface EbmlCueDurationTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueDuration;
}

export interface EbmlCueBlockNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueBlockNumber;
}

export interface EbmlCueCodecStateTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueCodecState;
}

export interface EbmlCueRefTimeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueRefTime;
}

export interface EbmlCueRefClusterTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueRefCluster;
}

export interface EbmlCueRefNumberTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueRefNumber;
}

export interface EbmlCueRefCodecStateTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CueRefCodecState;
}

export interface EbmlFileUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FileUID;
}

export interface EbmlFileUsedStartTimeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FileUsedStartTime;
}

export interface EbmlFileUsedEndTimeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FileUsedEndTime;
}

export interface EbmlEditionUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EditionUID;
}

export interface EbmlEditionFlagHiddenTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EditionFlagHidden;
}

export interface EbmlEditionFlagDefaultTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EditionFlagDefault;
}

export interface EbmlEditionFlagOrderedTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.EditionFlagOrdered;
}

export interface EbmlChapterUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterUID;
}

export interface EbmlChapterTimeStartTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterTimeStart;
}

export interface EbmlChapterTimeEndTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterTimeEnd;
}

export interface EbmlChapterFlagHiddenTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterFlagHidden;
}

export interface EbmlChapterFlagEnabledTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterFlagEnabled;
}

export interface EbmlChapterSegmentEditionUIDTagType
  extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterSegmentEditionUID;
}

export interface EbmlChapterPhysicalEquivTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterPhysicalEquiv;
}

export interface EbmlChapterTrackUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterTrackUID;
}

export interface EbmlChapProcessCodecIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapProcessCodecID;
}

export interface EbmlChapProcessTimeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapProcessTime;
}

export interface EbmlTargetTypeValueTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TargetTypeValue;
}

export interface EbmlTagTrackUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TagTrackUID;
}

export interface EbmlTagEditionUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TagEditionUID;
}

export interface EbmlTagChapterUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TagChapterUID;
}

export interface EbmlTagAttachmentUIDTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TagAttachmentUID;
}

export interface EbmlTagDefaultTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TagDefault;
}

export interface EbmlDocTypeExtensionVersionTagType
  extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DocTypeExtensionVersion;
}

export interface EbmlFlagHearingImpairedTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagHearingImpaired;
}

export interface EbmlFlagVisualImpairedTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagVisualImpaired;
}

export interface EbmlFlagTextDescriptionsTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagTextDescriptions;
}

export interface EbmlFlagOriginalTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagOriginal;
}

export interface EbmlFlagCommentaryTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FlagCommentary;
}

export interface EbmlDefaultDecodedFieldDurationTagType
  extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.DefaultDecodedFieldDuration;
}

export interface EbmlBlockAddIDValueTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.BlockAddIDValue;
}

export interface EbmlBlockAddIDTypeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.BlockAddIDType;
}

export interface EbmlCodecDelayTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CodecDelay;
}

export interface EbmlSeekPreRollTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.SeekPreRoll;
}

export interface EbmlFieldOrderTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.FieldOrder;
}

export interface EbmlAlphaModeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.AlphaMode;
}

export interface EbmlMatrixCoefficientsTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.MatrixCoefficients;
}

export interface EbmlBitsPerChannelTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.BitsPerChannel;
}

export interface EbmlChromaSubsamplingHorzTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChromaSubsamplingHorz;
}

export interface EbmlChromaSubsamplingVertTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChromaSubsamplingVert;
}

export interface EbmlCbSubsamplingHorzTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CbSubsamplingHorz;
}

export interface EbmlCbSubsamplingVertTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.CbSubsamplingVert;
}

export interface EbmlChromaSitingHorzTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChromaSitingHorz;
}

export interface EbmlChromaSitingVertTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChromaSitingVert;
}

export interface EbmlRangeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.Range;
}

export interface EbmlTransferCharacteristicsTagType
  extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TransferCharacteristics;
}

export interface EbmlPrimariesTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.Primaries;
}

export interface EbmlMaxCLLTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.MaxCLL;
}

export interface EbmlMaxFALLTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.MaxFALL;
}

export interface EbmlProjectionTypeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ProjectionType;
}

export interface EbmlEmphasisTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.Emphasis;
}

export interface EbmlAESSettingsCipherModeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.AESSettingsCipherMode;
}

export interface EbmlChapterSkipTypeTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.ChapterSkipType;
}

export interface EbmlTagDefaultBogusTagType extends EbmlUintTagTypeBase {
  id: EbmlTagIdEnum.TagDefaultBogus;
}

export type EbmlUintTagType =
  | EbmlEBMLVersionTagType
  | EbmlEBMLReadVersionTagType
  | EbmlEBMLMaxIDLengthTagType
  | EbmlEBMLMaxSizeLengthTagType
  | EbmlDocTypeVersionTagType
  | EbmlDocTypeReadVersionTagType
  | EbmlSignatureAlgoTagType
  | EbmlSignatureHashTagType
  | EbmlSeekPositionTagType
  | EbmlChapterTranslateEditionUIDTagType
  | EbmlChapterTranslateCodecTagType
  | EbmlTimestampScaleTagType
  | EbmlTimestampTagType
  | EbmlSilentTrackNumberTagType
  | EbmlPositionTagType
  | EbmlPrevSizeTagType
  | EbmlBlockAddIDTagType
  | EbmlBlockDurationTagType
  | EbmlReferencePriorityTagType
  | EbmlLaceNumberTagType
  | EbmlFrameNumberTagType
  | EbmlBlockAdditionIDTagType
  | EbmlDelayTagType
  | EbmlSliceDurationTagType
  | EbmlReferenceOffsetTagType
  | EbmlReferenceTimestampTagType
  | EbmlTrackNumberTagType
  | EbmlTrackUIDTagType
  | EbmlTrackTypeTagType
  | EbmlFlagEnabledTagType
  | EbmlFlagDefaultTagType
  | EbmlFlagForcedTagType
  | EbmlFlagLacingTagType
  | EbmlMinCacheTagType
  | EbmlMaxCacheTagType
  | EbmlDefaultDurationTagType
  | EbmlMaxBlockAdditionIDTagType
  | EbmlAttachmentLinkTagType
  | EbmlCodecDecodeAllTagType
  | EbmlTrackOverlayTagType
  | EbmlTrackTranslateEditionUIDTagType
  | EbmlTrackTranslateCodecTagType
  | EbmlFlagInterlacedTagType
  | EbmlStereoModeTagType
  | EbmlOldStereoModeTagType
  | EbmlPixelWidthTagType
  | EbmlPixelHeightTagType
  | EbmlPixelCropBottomTagType
  | EbmlPixelCropTopTagType
  | EbmlPixelCropLeftTagType
  | EbmlPixelCropRightTagType
  | EbmlDisplayWidthTagType
  | EbmlDisplayHeightTagType
  | EbmlDisplayUnitTagType
  | EbmlAspectRatioTypeTagType
  | EbmlChannelsTagType
  | EbmlBitDepthTagType
  | EbmlTrackPlaneUIDTagType
  | EbmlTrackPlaneTypeTagType
  | EbmlTrackJoinUIDTagType
  | EbmlTrickTrackUIDTagType
  | EbmlTrickTrackFlagTagType
  | EbmlTrickMasterTrackUIDTagType
  | EbmlContentEncodingOrderTagType
  | EbmlContentEncodingScopeTagType
  | EbmlContentEncodingTypeTagType
  | EbmlContentCompAlgoTagType
  | EbmlContentEncAlgoTagType
  | EbmlContentSigAlgoTagType
  | EbmlContentSigHashAlgoTagType
  | EbmlCueTimeTagType
  | EbmlCueTrackTagType
  | EbmlCueClusterPositionTagType
  | EbmlCueRelativePositionTagType
  | EbmlCueDurationTagType
  | EbmlCueBlockNumberTagType
  | EbmlCueCodecStateTagType
  | EbmlCueRefTimeTagType
  | EbmlCueRefClusterTagType
  | EbmlCueRefNumberTagType
  | EbmlCueRefCodecStateTagType
  | EbmlFileUIDTagType
  | EbmlFileUsedStartTimeTagType
  | EbmlFileUsedEndTimeTagType
  | EbmlEditionUIDTagType
  | EbmlEditionFlagHiddenTagType
  | EbmlEditionFlagDefaultTagType
  | EbmlEditionFlagOrderedTagType
  | EbmlChapterUIDTagType
  | EbmlChapterTimeStartTagType
  | EbmlChapterTimeEndTagType
  | EbmlChapterFlagHiddenTagType
  | EbmlChapterFlagEnabledTagType
  | EbmlChapterSegmentEditionUIDTagType
  | EbmlChapterPhysicalEquivTagType
  | EbmlChapterTrackUIDTagType
  | EbmlChapProcessCodecIDTagType
  | EbmlChapProcessTimeTagType
  | EbmlTargetTypeValueTagType
  | EbmlTagTrackUIDTagType
  | EbmlTagEditionUIDTagType
  | EbmlTagChapterUIDTagType
  | EbmlTagAttachmentUIDTagType
  | EbmlTagDefaultTagType
  | EbmlDocTypeExtensionVersionTagType
  | EbmlFlagHearingImpairedTagType
  | EbmlFlagVisualImpairedTagType
  | EbmlFlagTextDescriptionsTagType
  | EbmlFlagOriginalTagType
  | EbmlFlagCommentaryTagType
  | EbmlDefaultDecodedFieldDurationTagType
  | EbmlBlockAddIDValueTagType
  | EbmlBlockAddIDTypeTagType
  | EbmlCodecDelayTagType
  | EbmlSeekPreRollTagType
  | EbmlFieldOrderTagType
  | EbmlAlphaModeTagType
  | EbmlMatrixCoefficientsTagType
  | EbmlBitsPerChannelTagType
  | EbmlChromaSubsamplingHorzTagType
  | EbmlChromaSubsamplingVertTagType
  | EbmlCbSubsamplingHorzTagType
  | EbmlCbSubsamplingVertTagType
  | EbmlChromaSitingHorzTagType
  | EbmlChromaSitingVertTagType
  | EbmlRangeTagType
  | EbmlTransferCharacteristicsTagType
  | EbmlPrimariesTagType
  | EbmlMaxCLLTagType
  | EbmlMaxFALLTagType
  | EbmlProjectionTypeTagType
  | EbmlEmphasisTagType
  | EbmlAESSettingsCipherModeTagType
  | EbmlChapterSkipTypeTagType
  | EbmlTagDefaultBogusTagType;

export interface EbmlReferenceBlockTagType extends EbmlIntTagTypeBase {
  id: EbmlTagIdEnum.ReferenceBlock;
}

export interface EbmlReferenceVirtualTagType extends EbmlIntTagTypeBase {
  id: EbmlTagIdEnum.ReferenceVirtual;
}

export interface EbmlTrackOffsetTagType extends EbmlIntTagTypeBase {
  id: EbmlTagIdEnum.TrackOffset;
}

export interface EbmlDiscardPaddingTagType extends EbmlIntTagTypeBase {
  id: EbmlTagIdEnum.DiscardPadding;
}

export type EbmlIntTagType =
  | EbmlReferenceBlockTagType
  | EbmlReferenceVirtualTagType
  | EbmlTrackOffsetTagType
  | EbmlDiscardPaddingTagType;

export interface EbmlDocTypeTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.DocType;
}

export interface EbmlLanguageTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.Language;
}

export interface EbmlCodecIDTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.CodecID;
}

export interface EbmlCodecInfoURLTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.CodecInfoURL;
}

export interface EbmlCodecDownloadURLTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.CodecDownloadURL;
}

export interface EbmlFileMediaTypeTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.FileMediaType;
}

export interface EbmlChapLanguageTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.ChapLanguage;
}

export interface EbmlChapCountryTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.ChapCountry;
}

export interface EbmlTargetTypeTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.TargetType;
}

export interface EbmlTagLanguageTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.TagLanguage;
}

export interface EbmlDocTypeExtensionNameTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.DocTypeExtensionName;
}

export interface EbmlBlockAddIDNameTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.BlockAddIDName;
}

export interface EbmlLanguageBCP47TagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.LanguageBCP47;
}

export interface EbmlEditionLanguageIETFTagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.EditionLanguageIETF;
}

export interface EbmlChapLanguageBCP47TagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.ChapLanguageBCP47;
}

export interface EbmlTagLanguageBCP47TagType extends EbmlAsciiTagTypeBase {
  id: EbmlTagIdEnum.TagLanguageBCP47;
}

export type EbmlAsciiTagType =
  | EbmlDocTypeTagType
  | EbmlLanguageTagType
  | EbmlCodecIDTagType
  | EbmlCodecInfoURLTagType
  | EbmlCodecDownloadURLTagType
  | EbmlFileMediaTypeTagType
  | EbmlChapLanguageTagType
  | EbmlChapCountryTagType
  | EbmlTargetTypeTagType
  | EbmlTagLanguageTagType
  | EbmlDocTypeExtensionNameTagType
  | EbmlBlockAddIDNameTagType
  | EbmlLanguageBCP47TagType
  | EbmlEditionLanguageIETFTagType
  | EbmlChapLanguageBCP47TagType
  | EbmlTagLanguageBCP47TagType;

export interface EbmlSegmentFilenameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.SegmentFilename;
}

export interface EbmlPrevFilenameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.PrevFilename;
}

export interface EbmlNextFilenameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.NextFilename;
}

export interface EbmlTitleTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.Title;
}

export interface EbmlMuxingAppTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.MuxingApp;
}

export interface EbmlWritingAppTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.WritingApp;
}

export interface EbmlNameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.Name;
}

export interface EbmlCodecNameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.CodecName;
}

export interface EbmlCodecSettingsTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.CodecSettings;
}

export interface EbmlFileDescriptionTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.FileDescription;
}

export interface EbmlFileNameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.FileName;
}

export interface EbmlChapterStringUIDTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.ChapterStringUID;
}

export interface EbmlChapStringTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.ChapString;
}

export interface EbmlTagNameTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.TagName;
}

export interface EbmlTagStringTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.TagString;
}

export interface EbmlEditionStringTagType extends EbmlUtf8TagTypeBase {
  id: EbmlTagIdEnum.EditionString;
}

export type EbmlUtf8TagType =
  | EbmlSegmentFilenameTagType
  | EbmlPrevFilenameTagType
  | EbmlNextFilenameTagType
  | EbmlTitleTagType
  | EbmlMuxingAppTagType
  | EbmlWritingAppTagType
  | EbmlNameTagType
  | EbmlCodecNameTagType
  | EbmlCodecSettingsTagType
  | EbmlFileDescriptionTagType
  | EbmlFileNameTagType
  | EbmlChapterStringUIDTagType
  | EbmlChapStringTagType
  | EbmlTagNameTagType
  | EbmlTagStringTagType
  | EbmlEditionStringTagType;

export interface EbmlVoidTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.Void;
}

export interface EbmlCRC32TagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.CRC32;
}

export interface EbmlSignaturePublicKeyTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.SignaturePublicKey;
}

export interface EbmlSignatureTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.Signature;
}

export interface EbmlSignedElementTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.SignedElement;
}

export interface EbmlSeekIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.SeekID;
}

export interface EbmlSegmentUUIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.SegmentUUID;
}

export interface EbmlPrevUUIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.PrevUUID;
}

export interface EbmlNextUUIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.NextUUID;
}

export interface EbmlSegmentFamilyTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.SegmentFamily;
}

export interface EbmlChapterTranslateIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ChapterTranslateID;
}

export interface EbmlBlockVirtualTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.BlockVirtual;
}

export interface EbmlBlockAdditionalTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.BlockAdditional;
}

export interface EbmlCodecStateTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.CodecState;
}

export interface EbmlEncryptedBlockTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.EncryptedBlock;
}

export interface EbmlCodecPrivateTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.CodecPrivate;
}

export interface EbmlTrackTranslateTrackIDTagType
  extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.TrackTranslateTrackID;
}

export interface EbmlUncompressedFourCCTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.UncompressedFourCC;
}

export interface EbmlChannelPositionsTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ChannelPositions;
}

export interface EbmlTrickTrackSegmentUIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.TrickTrackSegmentUID;
}

export interface EbmlTrickMasterTrackSegmentUIDTagType
  extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.TrickMasterTrackSegmentUID;
}

export interface EbmlContentCompSettingsTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ContentCompSettings;
}

export interface EbmlContentEncKeyIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ContentEncKeyID;
}

export interface EbmlContentSignatureTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ContentSignature;
}

export interface EbmlContentSigKeyIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ContentSigKeyID;
}

export interface EbmlFileDataTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.FileData;
}

export interface EbmlFileReferralTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.FileReferral;
}

export interface EbmlChapterSegmentUUIDTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ChapterSegmentUUID;
}

export interface EbmlChapProcessPrivateTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ChapProcessPrivate;
}

export interface EbmlChapProcessDataTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ChapProcessData;
}

export interface EbmlTagBinaryTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.TagBinary;
}

export interface EbmlBlockAddIDExtraDataTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.BlockAddIDExtraData;
}

export interface EbmlProjectionPrivateTagType extends EbmlBinaryTagTypeBase {
  id: EbmlTagIdEnum.ProjectionPrivate;
}

export type EbmlBinaryTagType =
  | EbmlVoidTagType
  | EbmlCRC32TagType
  | EbmlSignaturePublicKeyTagType
  | EbmlSignatureTagType
  | EbmlSignedElementTagType
  | EbmlSeekIDTagType
  | EbmlSegmentUUIDTagType
  | EbmlPrevUUIDTagType
  | EbmlNextUUIDTagType
  | EbmlSegmentFamilyTagType
  | EbmlChapterTranslateIDTagType
  | EbmlBlockVirtualTagType
  | EbmlBlockAdditionalTagType
  | EbmlCodecStateTagType
  | EbmlEncryptedBlockTagType
  | EbmlCodecPrivateTagType
  | EbmlTrackTranslateTrackIDTagType
  | EbmlUncompressedFourCCTagType
  | EbmlChannelPositionsTagType
  | EbmlTrickTrackSegmentUIDTagType
  | EbmlTrickMasterTrackSegmentUIDTagType
  | EbmlContentCompSettingsTagType
  | EbmlContentEncKeyIDTagType
  | EbmlContentSignatureTagType
  | EbmlContentSigKeyIDTagType
  | EbmlFileDataTagType
  | EbmlFileReferralTagType
  | EbmlChapterSegmentUUIDTagType
  | EbmlChapProcessPrivateTagType
  | EbmlChapProcessDataTagType
  | EbmlTagBinaryTagType
  | EbmlBlockAddIDExtraDataTagType
  | EbmlProjectionPrivateTagType;

export interface EbmlDurationTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.Duration;
}

export interface EbmlTrackTimestampScaleTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.TrackTimestampScale;
}

export interface EbmlGammaValueTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.GammaValue;
}

export interface EbmlFrameRateTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.FrameRate;
}

export interface EbmlSamplingFrequencyTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.SamplingFrequency;
}

export interface EbmlOutputSamplingFrequencyTagType
  extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.OutputSamplingFrequency;
}

export interface EbmlPrimaryRChromaticityXTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.PrimaryRChromaticityX;
}

export interface EbmlPrimaryRChromaticityYTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.PrimaryRChromaticityY;
}

export interface EbmlPrimaryGChromaticityXTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.PrimaryGChromaticityX;
}

export interface EbmlPrimaryGChromaticityYTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.PrimaryGChromaticityY;
}

export interface EbmlPrimaryBChromaticityXTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.PrimaryBChromaticityX;
}

export interface EbmlPrimaryBChromaticityYTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.PrimaryBChromaticityY;
}

export interface EbmlWhitePointChromaticityXTagType
  extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.WhitePointChromaticityX;
}

export interface EbmlWhitePointChromaticityYTagType
  extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.WhitePointChromaticityY;
}

export interface EbmlLuminanceMaxTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.LuminanceMax;
}

export interface EbmlLuminanceMinTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.LuminanceMin;
}

export interface EbmlProjectionPoseYawTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.ProjectionPoseYaw;
}

export interface EbmlProjectionPosePitchTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.ProjectionPosePitch;
}

export interface EbmlProjectionPoseRollTagType extends EbmlFloatTagTypeBase {
  id: EbmlTagIdEnum.ProjectionPoseRoll;
}

export type EbmlFloatTagType =
  | EbmlDurationTagType
  | EbmlTrackTimestampScaleTagType
  | EbmlGammaValueTagType
  | EbmlFrameRateTagType
  | EbmlSamplingFrequencyTagType
  | EbmlOutputSamplingFrequencyTagType
  | EbmlPrimaryRChromaticityXTagType
  | EbmlPrimaryRChromaticityYTagType
  | EbmlPrimaryGChromaticityXTagType
  | EbmlPrimaryGChromaticityYTagType
  | EbmlPrimaryBChromaticityXTagType
  | EbmlPrimaryBChromaticityYTagType
  | EbmlWhitePointChromaticityXTagType
  | EbmlWhitePointChromaticityYTagType
  | EbmlLuminanceMaxTagType
  | EbmlLuminanceMinTagType
  | EbmlProjectionPoseYawTagType
  | EbmlProjectionPosePitchTagType
  | EbmlProjectionPoseRollTagType;

export interface EbmlDateUTCTagType extends EbmlDateTagTypeBase {
  id: EbmlTagIdEnum.DateUTC;
}

export type EbmlDateTagType = EbmlDateUTCTagType;

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

export type EbmlBlockTagType = Omit<EbmlBlockTag, EbmlTagExcludeField> & {
  id: EbmlBlockTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type?: undefined;
  data?: undefined;
  children?: [];
};

export type EbmlDataTagType =
  | EbmlUintTagType
  | EbmlIntTagType
  | EbmlAsciiTagType
  | EbmlUtf8TagType
  | EbmlBinaryTagType
  | EbmlFloatTagType
  | EbmlDateTagType;

export type EbmlAdhocTagType = EbmlSimpleBlockTagType | EbmlBlockTagType;

export type EbmlTagType =
  | EbmlMasterTagType
  | EbmlDataTagType
  | EbmlAdhocTagType;
