#import "WxpayModule.h"

@implementation WxpayMoudle

RCTPromiseResolveBlock resolveBlock = nil;

- (instancetype)init
{
  self = [super init];
  if (self) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleWXPay:) name:@"WXPay" object:nil];
  }
  return self;
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)handleWXPay:(NSNotification *)aNotification
{
  NSString * errCode =  [aNotification userInfo][@"errCode"];
  resolveBlock(@{@"errCode": errCode});
}

RCT_EXPORT_METHOD(registerApp:(NSString *)APP_ID){
  [WXApi registerApp: APP_ID];//向微信注册
}

RCT_EXPORT_METHOD(pay:(NSDictionary *)order
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  resolveBlock = resolve;
  //调起微信支付
  PayReq *req = [[PayReq alloc] init];
  req.partnerId = [order objectForKey:@"partnerid"];
  req.prepayId = [order objectForKey:@"prepayid"];
  req.nonceStr = [order objectForKey:@"noncestr"];
  req.timeStamp = [[order objectForKey:@"timestamp"] intValue];
  req.package = [order objectForKey:@"package"];
  req.sign = [order objectForKey:@"sign"];
  [WXApi sendReq:req];
}

RCT_REMAP_METHOD(isSupported, // 判断是否支持调用微信SDK
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  if (![WXApi isWXAppInstalled]) resolve(@NO);
  else resolve(@YES);
}

RCT_EXPORT_MODULE(Wxpay);

@end
