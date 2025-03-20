export enum EbmlBlockLacing {
  None = 1,
  Xiph = 2,
  EBML = 3,
  FixedSize = 4,
}

export enum EbmlElementType {
  Master = 'm',
  Uint = 'u',
  Int = 'i',
  Ascii = 's',
  Utf8 = '8',
  Binary = 'b',
  Float = 'f',
  Date = 'd',
}

export enum EbmlTagPosition {
  Start = 1,
  Content = 2,
  End = 3,
}

export enum EbmlTagIdEnum {
  EBML = 0x1a45dfa3,
  EBMLVersion = 0x4286,
  EBMLReadVersion = 0x42f7,
  EBMLMaxIDLength = 0x42f2,
  EBMLMaxSizeLength = 0x42f3,
  DocType = 0x4282,
  DocTypeVersion = 0x4287,
  DocTypeReadVersion = 0x4285,
  Void = 0xec,
  CRC32 = 0xbf,
  SignatureSlot = 0x1b538667,
  SignatureAlgo = 0x7e8a,
  SignatureHash = 0x7e9a,
  SignaturePublicKey = 0x7ea5,
  Signature = 0x7eb5,
  SignatureElements = 0x7e5b,
  SignatureElementList = 0x7e7b,
  SignedElement = 0x6532,
  Segment = 0x18538067,
  SeekHead = 0x114d9b74,
  Seek = 0x4dbb,
  SeekID = 0x53ab,
  SeekPosition = 0x53ac,
  Info = 0x1549a966,
  SegmentUUID = 0x73a4,
  SegmentFilename = 0x7384,
  PrevUUID = 0x3cb923,
  PrevFilename = 0x3c83ab,
  NextUUID = 0x3eb923,
  NextFilename = 0x3e83bb,
  SegmentFamily = 0x4444,
  ChapterTranslate = 0x6924,
  ChapterTranslateEditionUID = 0x69fc,
  ChapterTranslateCodec = 0x69bf,
  ChapterTranslateID = 0x69a5,
  TimestampScale = 0x2ad7b1,
  Duration = 0x4489,
  DateUTC = 0x4461,
  Title = 0x7ba9,
  MuxingApp = 0x4d80,
  WritingApp = 0x5741,
  Cluster = 0x1f43b675,
  Timestamp = 0xe7,
  SilentTracks = 0x5854,
  SilentTrackNumber = 0x58d7,
  Position = 0xa7,
  PrevSize = 0xab,
  SimpleBlock = 0xa3,
  BlockGroup = 0xa0,
  Block = 0xa1,
  BlockVirtual = 0xa2,
  BlockAdditions = 0x75a1,
  BlockMore = 0xa6,
  BlockAddID = 0xee,
  BlockAdditional = 0xa5,
  BlockDuration = 0x9b,
  ReferencePriority = 0xfa,
  ReferenceBlock = 0xfb,
  ReferenceVirtual = 0xfd,
  CodecState = 0xa4,
  Slices = 0x8e,
  TimeSlice = 0xe8,
  LaceNumber = 0xcc,
  FrameNumber = 0xcd,
  BlockAdditionID = 0xcb,
  Delay = 0xce,
  SliceDuration = 0xcf,
  ReferenceFrame = 0xc8,
  ReferenceOffset = 0xc9,
  ReferenceTimestamp = 0xca,
  EncryptedBlock = 0xaf,
  Tracks = 0x1654ae6b,
  TrackEntry = 0xae,
  TrackNumber = 0xd7,
  TrackUID = 0x73c5,
  TrackType = 0x83,
  FlagEnabled = 0xb9,
  FlagDefault = 0x88,
  FlagForced = 0x55aa,
  FlagLacing = 0x9c,
  MinCache = 0x6de7,
  MaxCache = 0x6df8,
  DefaultDuration = 0x23e383,
  TrackTimestampScale = 0x23314f,
  TrackOffset = 0x537f,
  MaxBlockAdditionID = 0x55ee,
  Name = 0x536e,
  Language = 0x22b59c,
  CodecID = 0x86,
  CodecPrivate = 0x63a2,
  CodecName = 0x258688,
  AttachmentLink = 0x7446,
  CodecSettings = 0x3a9697,
  CodecInfoURL = 0x3b4040,
  CodecDownloadURL = 0x26b240,
  CodecDecodeAll = 0xaa,
  TrackOverlay = 0x6fab,
  TrackTranslate = 0x6624,
  TrackTranslateEditionUID = 0x66fc,
  TrackTranslateCodec = 0x66bf,
  TrackTranslateTrackID = 0x66a5,
  Video = 0xe0,
  FlagInterlaced = 0x9a,
  StereoMode = 0x53b8,
  OldStereoMode = 0x53b9,
  PixelWidth = 0xb0,
  PixelHeight = 0xba,
  PixelCropBottom = 0x54aa,
  PixelCropTop = 0x54bb,
  PixelCropLeft = 0x54cc,
  PixelCropRight = 0x54dd,
  DisplayWidth = 0x54b0,
  DisplayHeight = 0x54ba,
  DisplayUnit = 0x54b2,
  AspectRatioType = 0x54b3,
  UncompressedFourCC = 0x2eb524,
  GammaValue = 0x2fb523,
  FrameRate = 0x2383e3,
  Audio = 0xe1,
  SamplingFrequency = 0xb5,
  OutputSamplingFrequency = 0x78b5,
  Channels = 0x9f,
  ChannelPositions = 0x7d7b,
  BitDepth = 0x6264,
  TrackOperation = 0xe2,
  TrackCombinePlanes = 0xe3,
  TrackPlane = 0xe4,
  TrackPlaneUID = 0xe5,
  TrackPlaneType = 0xe6,
  TrackJoinBlocks = 0xe9,
  TrackJoinUID = 0xed,
  TrickTrackUID = 0xc0,
  TrickTrackSegmentUID = 0xc1,
  TrickTrackFlag = 0xc6,
  TrickMasterTrackUID = 0xc7,
  TrickMasterTrackSegmentUID = 0xc4,
  ContentEncodings = 0x6d80,
  ContentEncoding = 0x6240,
  ContentEncodingOrder = 0x5031,
  ContentEncodingScope = 0x5032,
  ContentEncodingType = 0x5033,
  ContentCompression = 0x5034,
  ContentCompAlgo = 0x4254,
  ContentCompSettings = 0x4255,
  ContentEncryption = 0x5035,
  ContentEncAlgo = 0x47e1,
  ContentEncKeyID = 0x47e2,
  ContentSignature = 0x47e3,
  ContentSigKeyID = 0x47e4,
  ContentSigAlgo = 0x47e5,
  ContentSigHashAlgo = 0x47e6,
  Cues = 0x1c53bb6b,
  CuePoint = 0xbb,
  CueTime = 0xb3,
  CueTrackPositions = 0xb7,
  CueTrack = 0xf7,
  CueClusterPosition = 0xf1,
  CueRelativePosition = 0xf0,
  CueDuration = 0xb2,
  CueBlockNumber = 0x5378,
  CueCodecState = 0xea,
  CueReference = 0xdb,
  CueRefTime = 0x96,
  CueRefCluster = 0x97,
  CueRefNumber = 0x535f,
  CueRefCodecState = 0xeb,
  Attachments = 0x1941a469,
  AttachedFile = 0x61a7,
  FileDescription = 0x467e,
  FileName = 0x466e,
  FileMediaType = 0x4660,
  FileData = 0x465c,
  FileUID = 0x46ae,
  FileReferral = 0x4675,
  FileUsedStartTime = 0x4661,
  FileUsedEndTime = 0x4662,
  Chapters = 0x1043a770,
  EditionEntry = 0x45b9,
  EditionUID = 0x45bc,
  EditionFlagHidden = 0x45bd,
  EditionFlagDefault = 0x45db,
  EditionFlagOrdered = 0x45dd,
  ChapterAtom = 0xb6,
  ChapterUID = 0x73c4,
  ChapterStringUID = 0x5654,
  ChapterTimeStart = 0x91,
  ChapterTimeEnd = 0x92,
  ChapterFlagHidden = 0x98,
  ChapterFlagEnabled = 0x4598,
  ChapterSegmentUUID = 0x6e67,
  ChapterSegmentEditionUID = 0x6ebc,
  ChapterPhysicalEquiv = 0x63c3,
  ChapterTrack = 0x8f,
  ChapterTrackUID = 0x89,
  ChapterDisplay = 0x80,
  ChapString = 0x85,
  ChapLanguage = 0x437c,
  ChapCountry = 0x437e,
  ChapProcess = 0x6944,
  ChapProcessCodecID = 0x6955,
  ChapProcessPrivate = 0x450d,
  ChapProcessCommand = 0x6911,
  ChapProcessTime = 0x6922,
  ChapProcessData = 0x6933,
  Tags = 0x1254c367,
  Tag = 0x7373,
  Targets = 0x63c0,
  TargetTypeValue = 0x68ca,
  TargetType = 0x63ca,
  TagTrackUID = 0x63c5,
  TagEditionUID = 0x63c9,
  TagChapterUID = 0x63c4,
  TagAttachmentUID = 0x63c6,
  SimpleTag = 0x67c8,
  TagName = 0x45a3,
  TagLanguage = 0x447a,
  TagDefault = 0x4484,
  TagString = 0x4487,
  TagBinary = 0x4485,
  DocTypeExtension = 0x4281,
  DocTypeExtensionName = 0x4283,
  DocTypeExtensionVersion = 0x4284,
  DiscardPadding = 0x75a2,
  FlagHearingImpaired = 0x55ab,
  FlagVisualImpaired = 0x55ac,
  FlagTextDescriptions = 0x55ad,
  FlagOriginal = 0x55ae,
  FlagCommentary = 0x55af,
  DefaultDecodedFieldDuration = 0x234e7a,
  BlockAdditionMapping = 0x41e4,
  BlockAddIDValue = 0x41f0,
  BlockAddIDName = 0x41a4,
  BlockAddIDType = 0x41e7,
  BlockAddIDExtraData = 0x41ed,
  LanguageBCP47 = 0x22b59d,
  CodecDelay = 0x56aa,
  SeekPreRoll = 0x56bb,
  FieldOrder = 0x9d,
  AlphaMode = 0x53c0,
  Colour = 0x55b0,
  MatrixCoefficients = 0x55b1,
  BitsPerChannel = 0x55b2,
  ChromaSubsamplingHorz = 0x55b3,
  ChromaSubsamplingVert = 0x55b4,
  CbSubsamplingHorz = 0x55b5,
  CbSubsamplingVert = 0x55b6,
  ChromaSitingHorz = 0x55b7,
  ChromaSitingVert = 0x55b8,
  Range = 0x55b9,
  TransferCharacteristics = 0x55ba,
  Primaries = 0x55bb,
  MaxCLL = 0x55bc,
  MaxFALL = 0x55bd,
  MasteringMetadata = 0x55d0,
  PrimaryRChromaticityX = 0x55d1,
  PrimaryRChromaticityY = 0x55d2,
  PrimaryGChromaticityX = 0x55d3,
  PrimaryGChromaticityY = 0x55d4,
  PrimaryBChromaticityX = 0x55d5,
  PrimaryBChromaticityY = 0x55d6,
  WhitePointChromaticityX = 0x55d7,
  WhitePointChromaticityY = 0x55d8,
  LuminanceMax = 0x55d9,
  LuminanceMin = 0x55da,
  Projection = 0x7670,
  ProjectionType = 0x7671,
  ProjectionPrivate = 0x7672,
  ProjectionPoseYaw = 0x7673,
  ProjectionPosePitch = 0x7674,
  ProjectionPoseRoll = 0x7675,
  Emphasis = 0x52f1,
  ContentEncAESSettings = 0x47e7,
  AESSettingsCipherMode = 0x47e8,
  EditionDisplay = 0x4520,
  EditionString = 0x4521,
  EditionLanguageIETF = 0x45e4,
  ChapterSkipType = 0x4588,
  ChapLanguageBCP47 = 0x437d,
  TagLanguageBCP47 = 0x447b,
  TagDefaultBogus = 0x44b4,
}

export type EbmlMasterTagIdType =
  | EbmlTagIdEnum.EBML
  | EbmlTagIdEnum.SignatureSlot
  | EbmlTagIdEnum.SignatureElements
  | EbmlTagIdEnum.SignatureElementList
  | EbmlTagIdEnum.Segment
  | EbmlTagIdEnum.SeekHead
  | EbmlTagIdEnum.Seek
  | EbmlTagIdEnum.Info
  | EbmlTagIdEnum.ChapterTranslate
  | EbmlTagIdEnum.Cluster
  | EbmlTagIdEnum.SilentTracks
  | EbmlTagIdEnum.BlockGroup
  | EbmlTagIdEnum.BlockAdditions
  | EbmlTagIdEnum.BlockMore
  | EbmlTagIdEnum.Slices
  | EbmlTagIdEnum.TimeSlice
  | EbmlTagIdEnum.ReferenceFrame
  | EbmlTagIdEnum.Tracks
  | EbmlTagIdEnum.TrackEntry
  | EbmlTagIdEnum.TrackTranslate
  | EbmlTagIdEnum.Video
  | EbmlTagIdEnum.Audio
  | EbmlTagIdEnum.TrackOperation
  | EbmlTagIdEnum.TrackCombinePlanes
  | EbmlTagIdEnum.TrackPlane
  | EbmlTagIdEnum.TrackJoinBlocks
  | EbmlTagIdEnum.ContentEncodings
  | EbmlTagIdEnum.ContentEncoding
  | EbmlTagIdEnum.ContentCompression
  | EbmlTagIdEnum.ContentEncryption
  | EbmlTagIdEnum.Cues
  | EbmlTagIdEnum.CuePoint
  | EbmlTagIdEnum.CueTrackPositions
  | EbmlTagIdEnum.CueReference
  | EbmlTagIdEnum.Attachments
  | EbmlTagIdEnum.AttachedFile
  | EbmlTagIdEnum.Chapters
  | EbmlTagIdEnum.EditionEntry
  | EbmlTagIdEnum.ChapterAtom
  | EbmlTagIdEnum.ChapterTrack
  | EbmlTagIdEnum.ChapterDisplay
  | EbmlTagIdEnum.ChapProcess
  | EbmlTagIdEnum.ChapProcessCommand
  | EbmlTagIdEnum.Tags
  | EbmlTagIdEnum.Tag
  | EbmlTagIdEnum.Targets
  | EbmlTagIdEnum.SimpleTag
  | EbmlTagIdEnum.DocTypeExtension
  | EbmlTagIdEnum.BlockAdditionMapping
  | EbmlTagIdEnum.Colour
  | EbmlTagIdEnum.MasteringMetadata
  | EbmlTagIdEnum.Projection
  | EbmlTagIdEnum.ContentEncAESSettings
  | EbmlTagIdEnum.EditionDisplay;

export type EbmlUintTagIdType =
  | EbmlTagIdEnum.EBMLVersion
  | EbmlTagIdEnum.EBMLReadVersion
  | EbmlTagIdEnum.EBMLMaxIDLength
  | EbmlTagIdEnum.EBMLMaxSizeLength
  | EbmlTagIdEnum.DocTypeVersion
  | EbmlTagIdEnum.DocTypeReadVersion
  | EbmlTagIdEnum.SignatureAlgo
  | EbmlTagIdEnum.SignatureHash
  | EbmlTagIdEnum.SeekPosition
  | EbmlTagIdEnum.ChapterTranslateEditionUID
  | EbmlTagIdEnum.ChapterTranslateCodec
  | EbmlTagIdEnum.TimestampScale
  | EbmlTagIdEnum.Timestamp
  | EbmlTagIdEnum.SilentTrackNumber
  | EbmlTagIdEnum.Position
  | EbmlTagIdEnum.PrevSize
  | EbmlTagIdEnum.BlockAddID
  | EbmlTagIdEnum.BlockDuration
  | EbmlTagIdEnum.ReferencePriority
  | EbmlTagIdEnum.LaceNumber
  | EbmlTagIdEnum.FrameNumber
  | EbmlTagIdEnum.BlockAdditionID
  | EbmlTagIdEnum.Delay
  | EbmlTagIdEnum.SliceDuration
  | EbmlTagIdEnum.ReferenceOffset
  | EbmlTagIdEnum.ReferenceTimestamp
  | EbmlTagIdEnum.TrackNumber
  | EbmlTagIdEnum.TrackUID
  | EbmlTagIdEnum.TrackType
  | EbmlTagIdEnum.FlagEnabled
  | EbmlTagIdEnum.FlagDefault
  | EbmlTagIdEnum.FlagForced
  | EbmlTagIdEnum.FlagLacing
  | EbmlTagIdEnum.MinCache
  | EbmlTagIdEnum.MaxCache
  | EbmlTagIdEnum.DefaultDuration
  | EbmlTagIdEnum.MaxBlockAdditionID
  | EbmlTagIdEnum.AttachmentLink
  | EbmlTagIdEnum.CodecDecodeAll
  | EbmlTagIdEnum.TrackOverlay
  | EbmlTagIdEnum.TrackTranslateEditionUID
  | EbmlTagIdEnum.TrackTranslateCodec
  | EbmlTagIdEnum.FlagInterlaced
  | EbmlTagIdEnum.StereoMode
  | EbmlTagIdEnum.OldStereoMode
  | EbmlTagIdEnum.PixelWidth
  | EbmlTagIdEnum.PixelHeight
  | EbmlTagIdEnum.PixelCropBottom
  | EbmlTagIdEnum.PixelCropTop
  | EbmlTagIdEnum.PixelCropLeft
  | EbmlTagIdEnum.PixelCropRight
  | EbmlTagIdEnum.DisplayWidth
  | EbmlTagIdEnum.DisplayHeight
  | EbmlTagIdEnum.DisplayUnit
  | EbmlTagIdEnum.AspectRatioType
  | EbmlTagIdEnum.Channels
  | EbmlTagIdEnum.BitDepth
  | EbmlTagIdEnum.TrackPlaneUID
  | EbmlTagIdEnum.TrackPlaneType
  | EbmlTagIdEnum.TrackJoinUID
  | EbmlTagIdEnum.TrickTrackUID
  | EbmlTagIdEnum.TrickTrackFlag
  | EbmlTagIdEnum.TrickMasterTrackUID
  | EbmlTagIdEnum.ContentEncodingOrder
  | EbmlTagIdEnum.ContentEncodingScope
  | EbmlTagIdEnum.ContentEncodingType
  | EbmlTagIdEnum.ContentCompAlgo
  | EbmlTagIdEnum.ContentEncAlgo
  | EbmlTagIdEnum.ContentSigAlgo
  | EbmlTagIdEnum.ContentSigHashAlgo
  | EbmlTagIdEnum.CueTime
  | EbmlTagIdEnum.CueTrack
  | EbmlTagIdEnum.CueClusterPosition
  | EbmlTagIdEnum.CueRelativePosition
  | EbmlTagIdEnum.CueDuration
  | EbmlTagIdEnum.CueBlockNumber
  | EbmlTagIdEnum.CueCodecState
  | EbmlTagIdEnum.CueRefTime
  | EbmlTagIdEnum.CueRefCluster
  | EbmlTagIdEnum.CueRefNumber
  | EbmlTagIdEnum.CueRefCodecState
  | EbmlTagIdEnum.FileUID
  | EbmlTagIdEnum.FileUsedStartTime
  | EbmlTagIdEnum.FileUsedEndTime
  | EbmlTagIdEnum.EditionUID
  | EbmlTagIdEnum.EditionFlagHidden
  | EbmlTagIdEnum.EditionFlagDefault
  | EbmlTagIdEnum.EditionFlagOrdered
  | EbmlTagIdEnum.ChapterUID
  | EbmlTagIdEnum.ChapterTimeStart
  | EbmlTagIdEnum.ChapterTimeEnd
  | EbmlTagIdEnum.ChapterFlagHidden
  | EbmlTagIdEnum.ChapterFlagEnabled
  | EbmlTagIdEnum.ChapterSegmentEditionUID
  | EbmlTagIdEnum.ChapterPhysicalEquiv
  | EbmlTagIdEnum.ChapterTrackUID
  | EbmlTagIdEnum.ChapProcessCodecID
  | EbmlTagIdEnum.ChapProcessTime
  | EbmlTagIdEnum.TargetTypeValue
  | EbmlTagIdEnum.TagTrackUID
  | EbmlTagIdEnum.TagEditionUID
  | EbmlTagIdEnum.TagChapterUID
  | EbmlTagIdEnum.TagAttachmentUID
  | EbmlTagIdEnum.TagDefault
  | EbmlTagIdEnum.DocTypeExtensionVersion
  | EbmlTagIdEnum.FlagHearingImpaired
  | EbmlTagIdEnum.FlagVisualImpaired
  | EbmlTagIdEnum.FlagTextDescriptions
  | EbmlTagIdEnum.FlagOriginal
  | EbmlTagIdEnum.FlagCommentary
  | EbmlTagIdEnum.DefaultDecodedFieldDuration
  | EbmlTagIdEnum.BlockAddIDValue
  | EbmlTagIdEnum.BlockAddIDType
  | EbmlTagIdEnum.CodecDelay
  | EbmlTagIdEnum.SeekPreRoll
  | EbmlTagIdEnum.FieldOrder
  | EbmlTagIdEnum.AlphaMode
  | EbmlTagIdEnum.MatrixCoefficients
  | EbmlTagIdEnum.BitsPerChannel
  | EbmlTagIdEnum.ChromaSubsamplingHorz
  | EbmlTagIdEnum.ChromaSubsamplingVert
  | EbmlTagIdEnum.CbSubsamplingHorz
  | EbmlTagIdEnum.CbSubsamplingVert
  | EbmlTagIdEnum.ChromaSitingHorz
  | EbmlTagIdEnum.ChromaSitingVert
  | EbmlTagIdEnum.Range
  | EbmlTagIdEnum.TransferCharacteristics
  | EbmlTagIdEnum.Primaries
  | EbmlTagIdEnum.MaxCLL
  | EbmlTagIdEnum.MaxFALL
  | EbmlTagIdEnum.ProjectionType
  | EbmlTagIdEnum.Emphasis
  | EbmlTagIdEnum.AESSettingsCipherMode
  | EbmlTagIdEnum.ChapterSkipType
  | EbmlTagIdEnum.TagDefaultBogus;

export type EbmlIntTagIdType =
  | EbmlTagIdEnum.ReferenceBlock
  | EbmlTagIdEnum.ReferenceVirtual
  | EbmlTagIdEnum.TrackOffset
  | EbmlTagIdEnum.DiscardPadding;

export type EbmlAsciiTagIdType =
  | EbmlTagIdEnum.DocType
  | EbmlTagIdEnum.Language
  | EbmlTagIdEnum.CodecID
  | EbmlTagIdEnum.CodecInfoURL
  | EbmlTagIdEnum.CodecDownloadURL
  | EbmlTagIdEnum.FileMediaType
  | EbmlTagIdEnum.ChapLanguage
  | EbmlTagIdEnum.ChapCountry
  | EbmlTagIdEnum.TargetType
  | EbmlTagIdEnum.TagLanguage
  | EbmlTagIdEnum.DocTypeExtensionName
  | EbmlTagIdEnum.BlockAddIDName
  | EbmlTagIdEnum.LanguageBCP47
  | EbmlTagIdEnum.EditionLanguageIETF
  | EbmlTagIdEnum.ChapLanguageBCP47
  | EbmlTagIdEnum.TagLanguageBCP47;

export type EbmlUtf8TagIdType =
  | EbmlTagIdEnum.SegmentFilename
  | EbmlTagIdEnum.PrevFilename
  | EbmlTagIdEnum.NextFilename
  | EbmlTagIdEnum.Title
  | EbmlTagIdEnum.MuxingApp
  | EbmlTagIdEnum.WritingApp
  | EbmlTagIdEnum.Name
  | EbmlTagIdEnum.CodecName
  | EbmlTagIdEnum.CodecSettings
  | EbmlTagIdEnum.FileDescription
  | EbmlTagIdEnum.FileName
  | EbmlTagIdEnum.ChapterStringUID
  | EbmlTagIdEnum.ChapString
  | EbmlTagIdEnum.TagName
  | EbmlTagIdEnum.TagString
  | EbmlTagIdEnum.EditionString;

export type EbmlBinaryTagIdType =
  | EbmlTagIdEnum.Void
  | EbmlTagIdEnum.CRC32
  | EbmlTagIdEnum.SignaturePublicKey
  | EbmlTagIdEnum.Signature
  | EbmlTagIdEnum.SignedElement
  | EbmlTagIdEnum.SeekID
  | EbmlTagIdEnum.SegmentUUID
  | EbmlTagIdEnum.PrevUUID
  | EbmlTagIdEnum.NextUUID
  | EbmlTagIdEnum.SegmentFamily
  | EbmlTagIdEnum.ChapterTranslateID
  | EbmlTagIdEnum.BlockVirtual
  | EbmlTagIdEnum.BlockAdditional
  | EbmlTagIdEnum.CodecState
  | EbmlTagIdEnum.EncryptedBlock
  | EbmlTagIdEnum.CodecPrivate
  | EbmlTagIdEnum.TrackTranslateTrackID
  | EbmlTagIdEnum.UncompressedFourCC
  | EbmlTagIdEnum.ChannelPositions
  | EbmlTagIdEnum.TrickTrackSegmentUID
  | EbmlTagIdEnum.TrickMasterTrackSegmentUID
  | EbmlTagIdEnum.ContentCompSettings
  | EbmlTagIdEnum.ContentEncKeyID
  | EbmlTagIdEnum.ContentSignature
  | EbmlTagIdEnum.ContentSigKeyID
  | EbmlTagIdEnum.FileData
  | EbmlTagIdEnum.FileReferral
  | EbmlTagIdEnum.ChapterSegmentUUID
  | EbmlTagIdEnum.ChapProcessPrivate
  | EbmlTagIdEnum.ChapProcessData
  | EbmlTagIdEnum.TagBinary
  | EbmlTagIdEnum.BlockAddIDExtraData
  | EbmlTagIdEnum.ProjectionPrivate;

export type EbmlFloatTagIdType =
  | EbmlTagIdEnum.Duration
  | EbmlTagIdEnum.TrackTimestampScale
  | EbmlTagIdEnum.GammaValue
  | EbmlTagIdEnum.FrameRate
  | EbmlTagIdEnum.SamplingFrequency
  | EbmlTagIdEnum.OutputSamplingFrequency
  | EbmlTagIdEnum.PrimaryRChromaticityX
  | EbmlTagIdEnum.PrimaryRChromaticityY
  | EbmlTagIdEnum.PrimaryGChromaticityX
  | EbmlTagIdEnum.PrimaryGChromaticityY
  | EbmlTagIdEnum.PrimaryBChromaticityX
  | EbmlTagIdEnum.PrimaryBChromaticityY
  | EbmlTagIdEnum.WhitePointChromaticityX
  | EbmlTagIdEnum.WhitePointChromaticityY
  | EbmlTagIdEnum.LuminanceMax
  | EbmlTagIdEnum.LuminanceMin
  | EbmlTagIdEnum.ProjectionPoseYaw
  | EbmlTagIdEnum.ProjectionPosePitch
  | EbmlTagIdEnum.ProjectionPoseRoll;

export type EbmlDateTagIdType = EbmlTagIdEnum.DateUTC;

export type EbmlSimpleBlockTagIdType = EbmlTagIdEnum.SimpleBlock;

export type EbmlBlockTagIdType = EbmlTagIdEnum.Block;

export type EbmlDataTagIdType =
  | EbmlUintTagIdType
  | EbmlIntTagIdType
  | EbmlAsciiTagIdType
  | EbmlUtf8TagIdType
  | EbmlBinaryTagIdType
  | EbmlFloatTagIdType
  | EbmlDateTagIdType;

export type EbmlAdhocTagIdType = EbmlSimpleBlockTagIdType | EbmlBlockTagIdType;

export type EbmlUnknownTagIdType = number | bigint;

export type EbmlKnownTagIdType =
  | EbmlDataTagIdType
  | EbmlMasterTagIdType
  | EbmlAdhocTagIdType;

export type EbmlTagIdType = EbmlKnownTagIdType | EbmlUnknownTagIdType;

/* return undefined means unknown or ad-hoc */
export function getEbmlTypeByTagId(
  id: EbmlTagIdType
): EbmlElementType | undefined {
  switch (id) {
    case EbmlTagIdEnum.EBML:
    case EbmlTagIdEnum.SignatureSlot:
    case EbmlTagIdEnum.SignatureElements:
    case EbmlTagIdEnum.SignatureElementList:
    case EbmlTagIdEnum.Segment:
    case EbmlTagIdEnum.SeekHead:
    case EbmlTagIdEnum.Seek:
    case EbmlTagIdEnum.Info:
    case EbmlTagIdEnum.ChapterTranslate:
    case EbmlTagIdEnum.Cluster:
    case EbmlTagIdEnum.SilentTracks:
    case EbmlTagIdEnum.BlockGroup:
    case EbmlTagIdEnum.BlockAdditions:
    case EbmlTagIdEnum.BlockMore:
    case EbmlTagIdEnum.Slices:
    case EbmlTagIdEnum.TimeSlice:
    case EbmlTagIdEnum.ReferenceFrame:
    case EbmlTagIdEnum.Tracks:
    case EbmlTagIdEnum.TrackEntry:
    case EbmlTagIdEnum.TrackTranslate:
    case EbmlTagIdEnum.Video:
    case EbmlTagIdEnum.Audio:
    case EbmlTagIdEnum.TrackOperation:
    case EbmlTagIdEnum.TrackCombinePlanes:
    case EbmlTagIdEnum.TrackPlane:
    case EbmlTagIdEnum.TrackJoinBlocks:
    case EbmlTagIdEnum.ContentEncodings:
    case EbmlTagIdEnum.ContentEncoding:
    case EbmlTagIdEnum.ContentCompression:
    case EbmlTagIdEnum.ContentEncryption:
    case EbmlTagIdEnum.Cues:
    case EbmlTagIdEnum.CuePoint:
    case EbmlTagIdEnum.CueTrackPositions:
    case EbmlTagIdEnum.CueReference:
    case EbmlTagIdEnum.Attachments:
    case EbmlTagIdEnum.AttachedFile:
    case EbmlTagIdEnum.Chapters:
    case EbmlTagIdEnum.EditionEntry:
    case EbmlTagIdEnum.ChapterAtom:
    case EbmlTagIdEnum.ChapterTrack:
    case EbmlTagIdEnum.ChapterDisplay:
    case EbmlTagIdEnum.ChapProcess:
    case EbmlTagIdEnum.ChapProcessCommand:
    case EbmlTagIdEnum.Tags:
    case EbmlTagIdEnum.Tag:
    case EbmlTagIdEnum.Targets:
    case EbmlTagIdEnum.SimpleTag:
    case EbmlTagIdEnum.DocTypeExtension:
    case EbmlTagIdEnum.BlockAdditionMapping:
    case EbmlTagIdEnum.Colour:
    case EbmlTagIdEnum.MasteringMetadata:
    case EbmlTagIdEnum.Projection:
    case EbmlTagIdEnum.ContentEncAESSettings:
    case EbmlTagIdEnum.EditionDisplay:
      return EbmlElementType.Master;
    case EbmlTagIdEnum.EBMLVersion:
    case EbmlTagIdEnum.EBMLReadVersion:
    case EbmlTagIdEnum.EBMLMaxIDLength:
    case EbmlTagIdEnum.EBMLMaxSizeLength:
    case EbmlTagIdEnum.DocTypeVersion:
    case EbmlTagIdEnum.DocTypeReadVersion:
    case EbmlTagIdEnum.SignatureAlgo:
    case EbmlTagIdEnum.SignatureHash:
    case EbmlTagIdEnum.SeekPosition:
    case EbmlTagIdEnum.ChapterTranslateEditionUID:
    case EbmlTagIdEnum.ChapterTranslateCodec:
    case EbmlTagIdEnum.TimestampScale:
    case EbmlTagIdEnum.Timestamp:
    case EbmlTagIdEnum.SilentTrackNumber:
    case EbmlTagIdEnum.Position:
    case EbmlTagIdEnum.PrevSize:
    case EbmlTagIdEnum.BlockAddID:
    case EbmlTagIdEnum.BlockDuration:
    case EbmlTagIdEnum.ReferencePriority:
    case EbmlTagIdEnum.LaceNumber:
    case EbmlTagIdEnum.FrameNumber:
    case EbmlTagIdEnum.BlockAdditionID:
    case EbmlTagIdEnum.Delay:
    case EbmlTagIdEnum.SliceDuration:
    case EbmlTagIdEnum.ReferenceOffset:
    case EbmlTagIdEnum.ReferenceTimestamp:
    case EbmlTagIdEnum.TrackNumber:
    case EbmlTagIdEnum.TrackUID:
    case EbmlTagIdEnum.TrackType:
    case EbmlTagIdEnum.FlagEnabled:
    case EbmlTagIdEnum.FlagDefault:
    case EbmlTagIdEnum.FlagForced:
    case EbmlTagIdEnum.FlagLacing:
    case EbmlTagIdEnum.MinCache:
    case EbmlTagIdEnum.MaxCache:
    case EbmlTagIdEnum.DefaultDuration:
    case EbmlTagIdEnum.MaxBlockAdditionID:
    case EbmlTagIdEnum.AttachmentLink:
    case EbmlTagIdEnum.CodecDecodeAll:
    case EbmlTagIdEnum.TrackOverlay:
    case EbmlTagIdEnum.TrackTranslateEditionUID:
    case EbmlTagIdEnum.TrackTranslateCodec:
    case EbmlTagIdEnum.FlagInterlaced:
    case EbmlTagIdEnum.StereoMode:
    case EbmlTagIdEnum.OldStereoMode:
    case EbmlTagIdEnum.PixelWidth:
    case EbmlTagIdEnum.PixelHeight:
    case EbmlTagIdEnum.PixelCropBottom:
    case EbmlTagIdEnum.PixelCropTop:
    case EbmlTagIdEnum.PixelCropLeft:
    case EbmlTagIdEnum.PixelCropRight:
    case EbmlTagIdEnum.DisplayWidth:
    case EbmlTagIdEnum.DisplayHeight:
    case EbmlTagIdEnum.DisplayUnit:
    case EbmlTagIdEnum.AspectRatioType:
    case EbmlTagIdEnum.Channels:
    case EbmlTagIdEnum.BitDepth:
    case EbmlTagIdEnum.TrackPlaneUID:
    case EbmlTagIdEnum.TrackPlaneType:
    case EbmlTagIdEnum.TrackJoinUID:
    case EbmlTagIdEnum.TrickTrackUID:
    case EbmlTagIdEnum.TrickTrackFlag:
    case EbmlTagIdEnum.TrickMasterTrackUID:
    case EbmlTagIdEnum.ContentEncodingOrder:
    case EbmlTagIdEnum.ContentEncodingScope:
    case EbmlTagIdEnum.ContentEncodingType:
    case EbmlTagIdEnum.ContentCompAlgo:
    case EbmlTagIdEnum.ContentEncAlgo:
    case EbmlTagIdEnum.ContentSigAlgo:
    case EbmlTagIdEnum.ContentSigHashAlgo:
    case EbmlTagIdEnum.CueTime:
    case EbmlTagIdEnum.CueTrack:
    case EbmlTagIdEnum.CueClusterPosition:
    case EbmlTagIdEnum.CueRelativePosition:
    case EbmlTagIdEnum.CueDuration:
    case EbmlTagIdEnum.CueBlockNumber:
    case EbmlTagIdEnum.CueCodecState:
    case EbmlTagIdEnum.CueRefTime:
    case EbmlTagIdEnum.CueRefCluster:
    case EbmlTagIdEnum.CueRefNumber:
    case EbmlTagIdEnum.CueRefCodecState:
    case EbmlTagIdEnum.FileUID:
    case EbmlTagIdEnum.FileUsedStartTime:
    case EbmlTagIdEnum.FileUsedEndTime:
    case EbmlTagIdEnum.EditionUID:
    case EbmlTagIdEnum.EditionFlagHidden:
    case EbmlTagIdEnum.EditionFlagDefault:
    case EbmlTagIdEnum.EditionFlagOrdered:
    case EbmlTagIdEnum.ChapterUID:
    case EbmlTagIdEnum.ChapterTimeStart:
    case EbmlTagIdEnum.ChapterTimeEnd:
    case EbmlTagIdEnum.ChapterFlagHidden:
    case EbmlTagIdEnum.ChapterFlagEnabled:
    case EbmlTagIdEnum.ChapterSegmentEditionUID:
    case EbmlTagIdEnum.ChapterPhysicalEquiv:
    case EbmlTagIdEnum.ChapterTrackUID:
    case EbmlTagIdEnum.ChapProcessCodecID:
    case EbmlTagIdEnum.ChapProcessTime:
    case EbmlTagIdEnum.TargetTypeValue:
    case EbmlTagIdEnum.TagTrackUID:
    case EbmlTagIdEnum.TagEditionUID:
    case EbmlTagIdEnum.TagChapterUID:
    case EbmlTagIdEnum.TagAttachmentUID:
    case EbmlTagIdEnum.TagDefault:
    case EbmlTagIdEnum.DocTypeExtensionVersion:
    case EbmlTagIdEnum.FlagHearingImpaired:
    case EbmlTagIdEnum.FlagVisualImpaired:
    case EbmlTagIdEnum.FlagTextDescriptions:
    case EbmlTagIdEnum.FlagOriginal:
    case EbmlTagIdEnum.FlagCommentary:
    case EbmlTagIdEnum.DefaultDecodedFieldDuration:
    case EbmlTagIdEnum.BlockAddIDValue:
    case EbmlTagIdEnum.BlockAddIDType:
    case EbmlTagIdEnum.CodecDelay:
    case EbmlTagIdEnum.SeekPreRoll:
    case EbmlTagIdEnum.FieldOrder:
    case EbmlTagIdEnum.AlphaMode:
    case EbmlTagIdEnum.MatrixCoefficients:
    case EbmlTagIdEnum.BitsPerChannel:
    case EbmlTagIdEnum.ChromaSubsamplingHorz:
    case EbmlTagIdEnum.ChromaSubsamplingVert:
    case EbmlTagIdEnum.CbSubsamplingHorz:
    case EbmlTagIdEnum.CbSubsamplingVert:
    case EbmlTagIdEnum.ChromaSitingHorz:
    case EbmlTagIdEnum.ChromaSitingVert:
    case EbmlTagIdEnum.Range:
    case EbmlTagIdEnum.TransferCharacteristics:
    case EbmlTagIdEnum.Primaries:
    case EbmlTagIdEnum.MaxCLL:
    case EbmlTagIdEnum.MaxFALL:
    case EbmlTagIdEnum.ProjectionType:
    case EbmlTagIdEnum.Emphasis:
    case EbmlTagIdEnum.AESSettingsCipherMode:
    case EbmlTagIdEnum.ChapterSkipType:
    case EbmlTagIdEnum.TagDefaultBogus:
      return EbmlElementType.Uint;
    case EbmlTagIdEnum.ReferenceBlock:
    case EbmlTagIdEnum.ReferenceVirtual:
    case EbmlTagIdEnum.TrackOffset:
    case EbmlTagIdEnum.DiscardPadding:
      return EbmlElementType.Int;
    case EbmlTagIdEnum.DocType:
    case EbmlTagIdEnum.Language:
    case EbmlTagIdEnum.CodecID:
    case EbmlTagIdEnum.CodecInfoURL:
    case EbmlTagIdEnum.CodecDownloadURL:
    case EbmlTagIdEnum.FileMediaType:
    case EbmlTagIdEnum.ChapLanguage:
    case EbmlTagIdEnum.ChapCountry:
    case EbmlTagIdEnum.TargetType:
    case EbmlTagIdEnum.TagLanguage:
    case EbmlTagIdEnum.DocTypeExtensionName:
    case EbmlTagIdEnum.BlockAddIDName:
    case EbmlTagIdEnum.LanguageBCP47:
    case EbmlTagIdEnum.EditionLanguageIETF:
    case EbmlTagIdEnum.ChapLanguageBCP47:
    case EbmlTagIdEnum.TagLanguageBCP47:
      return EbmlElementType.Ascii;
    case EbmlTagIdEnum.SegmentFilename:
    case EbmlTagIdEnum.PrevFilename:
    case EbmlTagIdEnum.NextFilename:
    case EbmlTagIdEnum.Title:
    case EbmlTagIdEnum.MuxingApp:
    case EbmlTagIdEnum.WritingApp:
    case EbmlTagIdEnum.Name:
    case EbmlTagIdEnum.CodecName:
    case EbmlTagIdEnum.CodecSettings:
    case EbmlTagIdEnum.FileDescription:
    case EbmlTagIdEnum.FileName:
    case EbmlTagIdEnum.ChapterStringUID:
    case EbmlTagIdEnum.ChapString:
    case EbmlTagIdEnum.TagName:
    case EbmlTagIdEnum.TagString:
    case EbmlTagIdEnum.EditionString:
      return EbmlElementType.Utf8;
    case EbmlTagIdEnum.Void:
    case EbmlTagIdEnum.CRC32:
    case EbmlTagIdEnum.SignaturePublicKey:
    case EbmlTagIdEnum.Signature:
    case EbmlTagIdEnum.SignedElement:
    case EbmlTagIdEnum.SeekID:
    case EbmlTagIdEnum.SegmentUUID:
    case EbmlTagIdEnum.PrevUUID:
    case EbmlTagIdEnum.NextUUID:
    case EbmlTagIdEnum.SegmentFamily:
    case EbmlTagIdEnum.ChapterTranslateID:
    case EbmlTagIdEnum.BlockVirtual:
    case EbmlTagIdEnum.BlockAdditional:
    case EbmlTagIdEnum.CodecState:
    case EbmlTagIdEnum.EncryptedBlock:
    case EbmlTagIdEnum.CodecPrivate:
    case EbmlTagIdEnum.TrackTranslateTrackID:
    case EbmlTagIdEnum.UncompressedFourCC:
    case EbmlTagIdEnum.ChannelPositions:
    case EbmlTagIdEnum.TrickTrackSegmentUID:
    case EbmlTagIdEnum.TrickMasterTrackSegmentUID:
    case EbmlTagIdEnum.ContentCompSettings:
    case EbmlTagIdEnum.ContentEncKeyID:
    case EbmlTagIdEnum.ContentSignature:
    case EbmlTagIdEnum.ContentSigKeyID:
    case EbmlTagIdEnum.FileData:
    case EbmlTagIdEnum.FileReferral:
    case EbmlTagIdEnum.ChapterSegmentUUID:
    case EbmlTagIdEnum.ChapProcessPrivate:
    case EbmlTagIdEnum.ChapProcessData:
    case EbmlTagIdEnum.TagBinary:
    case EbmlTagIdEnum.BlockAddIDExtraData:
    case EbmlTagIdEnum.ProjectionPrivate:
      return EbmlElementType.Binary;
    case EbmlTagIdEnum.Duration:
    case EbmlTagIdEnum.TrackTimestampScale:
    case EbmlTagIdEnum.GammaValue:
    case EbmlTagIdEnum.FrameRate:
    case EbmlTagIdEnum.SamplingFrequency:
    case EbmlTagIdEnum.OutputSamplingFrequency:
    case EbmlTagIdEnum.PrimaryRChromaticityX:
    case EbmlTagIdEnum.PrimaryRChromaticityY:
    case EbmlTagIdEnum.PrimaryGChromaticityX:
    case EbmlTagIdEnum.PrimaryGChromaticityY:
    case EbmlTagIdEnum.PrimaryBChromaticityX:
    case EbmlTagIdEnum.PrimaryBChromaticityY:
    case EbmlTagIdEnum.WhitePointChromaticityX:
    case EbmlTagIdEnum.WhitePointChromaticityY:
    case EbmlTagIdEnum.LuminanceMax:
    case EbmlTagIdEnum.LuminanceMin:
    case EbmlTagIdEnum.ProjectionPoseYaw:
    case EbmlTagIdEnum.ProjectionPosePitch:
    case EbmlTagIdEnum.ProjectionPoseRoll:
      return EbmlElementType.Float;
    case EbmlTagIdEnum.DateUTC:
      return EbmlElementType.Date;
    default:
      return;
  }
}

export function isEbmlMasterTagId(
  tagId: EbmlTagIdType
): tagId is EbmlMasterTagIdType {
  return getEbmlTypeByTagId(tagId) === EbmlElementType.Master;
}

export function isEbmlUintTagId(
  tagId: EbmlTagIdType
): tagId is EbmlUintTagIdType {
  return getEbmlTypeByTagId(tagId) === EbmlElementType.Uint;
}

export function isEbmlIntTagId(
  tagId: EbmlTagIdType
): tagId is EbmlIntTagIdType {
  return getEbmlTypeByTagId(tagId) === EbmlElementType.Int;
}

export function isEbmlAsciiTagId(
  tagId: EbmlTagIdType
): tagId is EbmlAsciiTagIdType {
  return getEbmlTypeByTagId(tagId) === EbmlElementType.Ascii;
}

export function isEbmlUtf8TagId(
  tagId: EbmlTagIdType
): tagId is EbmlUtf8TagIdType {
  return getEbmlTypeByTagId(tagId) === EbmlElementType.Utf8;
}

export function isEbmlBinaryTagId(
  tagId: EbmlTagIdType
): tagId is EbmlBinaryTagIdType {
  return getEbmlTypeByTagId(tagId) === EbmlElementType.Binary;
}

export function isEbmlFloatTagId(
  tagId: EbmlTagIdType
): tagId is EbmlFloatTagIdType {
  return getEbmlTypeByTagId(tagId) === EbmlElementType.Float;
}

export function isEbmlDateTagId(
  tagId: EbmlTagIdType
): tagId is EbmlDateTagIdType {
  return getEbmlTypeByTagId(tagId) === EbmlElementType.Date;
}

export function isEbmlSimpleBlockTagId(
  tagId: EbmlTagIdType
): tagId is EbmlSimpleBlockTagIdType {
  return tagId === EbmlTagIdEnum.SimpleBlock;
}

export function isEbmlBlockTagId(
  tagId: EbmlTagIdType
): tagId is EbmlBlockTagIdType {
  return tagId === EbmlTagIdEnum.Block;
}

export function isEbmlUnknownTagId(tagId: EbmlTagIdType): boolean {
  return typeof tagId !== 'number' || !(tagId in EbmlTagIdEnum);
}
