
$(document).ready(function() {
    if (sessionStorage.getItem('login') === '0' || sessionStorage.getItem('login') === null) {
        const info = {
            url: '/api/v1/users/verify_token',
            method: 'POST',
            data: null,
            crossDomain: true,
            redirect: 'follow',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                if (res.success) {
                    console.log(res);
                    console.log('verifyToken success');
                    sessionStorage.setItem('email', res.email);
                    //alert('이미 로그인되어 있습니다.');
                    window.location.replace(res.redirect);
                } else {
                    console.log('verifyToken fail');
                    console.log(res);
                }
            },
            error: function (e) {
                console.log('ajax call error: login page - verifyToken');
                if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
                    console.log("check your URL, method(GET/POST)");
                }else if(e.status === 403){
                    if (e.responseText.includes("No token provided."))
                        console.log("No token, no problem.");
                    else if (e.responseText.includes("jwt malformed"))
                        console.log("Malformed token");
                    else if (e.responseText.includes("invalid signature"))
                        console.log("Modified token");
                    else console.log(e);
                } else if(e.status === 0){
                    if(navigator.onLine){
                        console.log('status : 0');
                    }else {
                        console.log('internet disconnected');
                        window.location.reload();
                    }
                } else{
                    console.log('status: ' + e.status + ', message: ' + e.responseText);
                    console.log(e);
                }
            }
        }
        sendTokenReq(info);
    } else {
        //alert('이미 로그인되어 있습니다.');
        location.href='/chat';
    }

    if(location.href.indexOf('access') !== -1) {
        console.log('이용약관');
        $('.card-header')[0].innerHTML = '이용약관';
        $('.card-body')[0].innerHTML =
            '<h5><b>제 1장 총칙</b></h5><br>'+
            '<b>제 1조 목적</b><br>'+
            '본 약관은 회원(서비스 약관에 동의한 자를 말합니다. 이하 ‘회원’)이 ㈜젤리랩(이하’회사’)이 제공하는 다양한 인터넷과 모바일 서비스(이하 ‘서비스’)를 이용함에 있어 회사와 회원의 권리, 의무 및 책임사항, 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다. 서비스를 이용함으로써 귀하는 본 약관에 동의하게 되므로 본 약관을 주의 깊게 읽어주시기 바랍니다.<br><br>' +
            '<b>제 2조 약관의 명시, 효력 및 변경</b><br>' +
            '① 본 약관의 내용은 회사가 제공하는 개별 서비스 또는 서비스 초기 화면에 게시하거나 기타의 방법으로 공지하고, 본 약관에 동의한 회원 모두에게 그 효력이 발생합니다.<br><br>' +
            '② 회사는 필요한 경우 관련법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다. 본 약관이 변경되는 경우 회사는 변경사항을 시행일자 15일 전부터 회원에게 공지 또는 통지하는 것을 원칙으로 하며, 피치 못하게 회원에게 불리한 내용으로 변경할 경우에는 그 시행일자 30일 전부터 젤리랩 계정으로 사용하는 이메일 주소로 이메일을 발송하거나, 회원이 등록한 휴대폰번호로 문자메시지를 보내거나, 서비스 내 전자쪽지 발송, 알림 메시지를 띄우는 등 합리적으로 가능한 방법으로 변경사항을 공지 또는 통지하겠습니다.<br><br>' +
            '③ 회사가 전 항에 따라 공지 또는 통지를 하면서 공지 또는 통지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 회원의 의사표시가 없는 경우에는 변경된 약관을 승인한 것으로 봅니다. 회원이 개정약관에 동의하지 않을 경우 회원은 제19조 제1항에 따라 이용계약을 해지할 수 있습니다.<br><br><br>' +
            '<b>제 3조 회원에 대한 통지</b><br>' +
            '① 회사가 회원에 대하여 통지를 하는 경우 이 약관에 별도의 규정이 없는 한 회원이 제공한 전자우편, 서비스 내 알림, 문자 알림 등으로 할 수 있습니다.<br><br>' +
            '② 회사는 회원 전체에 대한 통지의 경우 7일 이상 서비스 화면에 게시함으로써 제 1항의 통지에 갈음할 수 있습니다. 다만 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 제 1항의 통지를 합니다.<br><br>' +
            '③ 회사는 회원의 연락처 미기재, 변경후 미수정 등으로 인하여 개별 통지가 어려운 경우에 한하여 제 2항 본문의 공지를 함으로써 개별 통지를 한 것으로 간주합니다.<br><br><br>' +

            '<b>제 4조 약관 외 준칙</b><br>' +
            '본 약관에 규정되지 않은 사항에 대해서는 관련법령 또는 회사가 정한 서비스의 개별 이용약관, 운영정책 및 규칙 등(이하 ‘세부지침’)의 규정에 따릅니다. 또한 본 약관과 세부지침의 내용이 충돌할 경우 세부지침에 따릅니다.<br><br>' +

            '<h5><b>제 2장 회원가입 및 서비스 이용</b></h5><br>' +
            '<b>제 5조 이용계약의 성립 (회원가입)</b><br>' +
            '① 회원가입은 회원이 약관에 동의하고 계정 생성을 위해 필요한 일정 정보를 입력하여 가입합니다. 다만 회사는 아래와 같은 경우에는 고객의 계정 생성을 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다.<br><br>' +
                '1. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우<br>' +
                '2. 고객이 다른 사람의 명의나 이메일 주소 등 개인정보를 이용하여 계정을 생성하려 한 경우<br>' +
                '3. 허위의 정보를 기재하거나 회사가 필수적으로 입력을 요청한 부분을 기재하지 않은 경우<br>' +
                '4. 부정한 용도로 서비스를 사용하고자 하는 경우<br>' +
                '5. 회원의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우<br>' +
                '6. 회원의 이용 목적이나 서비스 이용 방법이 회사의 재산권이나 영업권을 침해하거나 침해할 우려가 있는 경우<br>' +
                '7. 비정상적인 방법을 통하여 계정 및 도메인을 대량으로 생성하는 행위<br>' +
                '8. 기타 관련법령에 위배되거나 본 약관 및 세부지침 등 회사가 정한 기준에 반하는 경우<br><br>' +
            '② 회사는 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.<br><br>' +
            '③ 회원은 계정과 Password 관리에 대한 의무와 책임이 있습니다. 계정과 Password 관리 소홀, 부정 사용에 의하여 발생하는 모든 결과에 대한 책임은 회원 본인에게 있습니다.<br><br>' +
            '④ 회원은 자신의 계정 및 Password를 제 3자가 이용하게 해서는 안되며, 자신의 계정 및 Password를 도난 당하거나 제 3자가 사용하고 있음을 인지하는 경우에는 바로 회사에 통보하고 회사의 안내가 있는 경우 그에 따라야 합니다.<br><br>' +
            '⑤ 회원은 가입시 회사에 제공한 정보에 변경이 있는 경우, 즉시 전자우편 또는 전화 등 기타의 밥법으로 회사에 대하여 그 변경사항을 알려야 합니다. 회원이 서비스 내 정보를 수정하지 않아 발생하는 손해에 대하여 회사는 책임을 부담하지 아니합니다.<br><br><br>' +

            '<b>제 6조 권리의 귀속 및 이용제한</b><br>' +
            '① 서비스의 디자인, 텍스트, 스크립트, 그래픽 등 회사가 제공하는 서비스에 관련된 모든 상표, 서비스 마크, 로고 등에 대한 저작권 기타 지식재산권은 회사가 갖습니다.<br><br>' +
            '② 회사가 회원에 대해 서비스를 제공하는 것은 이용약관에 정한 서비스 목적 하에서 회사가 허용한 방식으로 서비스에 대한 이용권한을 부여하는 것이며, 회원은 서비스를 소유하거나 서비스에 관한 저작권을 보유하게 되는 것이 아닙니다.<br><br>' +
            '③ 회원은 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 등 기타 방법에 의하여 영리 목적으로 이용하거나 제 3자에게 이용하게 하여서는 안됩니다.<br><br><br>' +

            '<b>제 7조 서비스의 제공, 변경 및 종료</b><br>' +
            '④ 회사가 회원에게 제공하는 서비스의 내용은 다음과 같습니다.<br><br>' +
            '1. 회원의 필요에 따라 몇 가지의 음식점 선택지를 제공합니다. 단, 회사는 몇 가지의 선택지만을 제공할 뿐이며, 회원의 결정에 따라 발생한 결과나 손해에 대해 어떤 책임도 지지 않습니다.<br>' +
            '2. ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ<br><br>' +
            '⑤ 회사는 제 1항의 서비스 외 다른 서비스를 추가할 수 있으며, 추가된 서비스에 대해서도 본 약관이 동일하게 적용됩니다.<br><br>' +
            '⑥ 회사는 회원과 별도로 서면 계약을 체결하여 젤리랩 서비스 및 제반 서비스의 브랜드 특성을 이용할 수 있는 명시적인 권리를 부여하지 아니하는 한, 회원에게 회사 또는 서비스의 상호, 상표, 서비스표, 로고, 도메인 네임 및 기타 식별력 있는 브랜드 특성을 이용할 수 있는 권리를 부여하지 않습니다.<br><br>' +
            '⑦ 회사는 기술적 사양의 변경이나 사업 정책적인 판단 하에 서비스의 내용을 변경하거나 종료할 수 있습니다. 이 경우에는 회사는 변경 또는 종료되는 서비스의 내용 및 제공일자를 명시하여 제 3조에 의한 방법으로 통지합니다. 단, 회사가 합리적으로 예측할 수 없는 불가피한 여건이나 사정이 있는 경우, 위 공지기간을 단축하거나 변경 이후에 공지할 수 있습니다.<br><br>' +
            '⑧ 회원은 제 4항의 서비스의 변경 등에 동의하지 않는 경우, 회사에 탈퇴 의사를 고지함으로써 서비스 이용 계약을 해지할 수 있고 제 O조, 제 O조에 따라 환불 처리합니다.<br><br><br>' +

            '<b>제 8조 광고의 게재</b><br>' +
            '① 회사는 서비스 운영과 관련하여 회원정보, 고객이 입력한 정보를 활용하여 광고를 게재할 수 있습니다. 회원은 서비스 이용 시 노출되는 맞춤 광고 게재에 대해 동의합니다.<br><br>' +
            '② 회사는 서비스 상에 게재되어 있거나 서비스를 통한 광고주의 판촉활동에 회원이 참여하거나 교신 또는 거래를 함으로써 발생하는 손실과 손해에 대해 책임을 지지 않습니다.<br><br><br>' +

            '<h5><b>제 3장 유료 서비스의 이용</b></h5><br>' +
            '<b>제 9조 유료 서비스의 이용</b><br>' +
            '① 회사는 유료 서비스의 내용, 이용방법, 이용료 및 기타 조건을 서비스 화면 또는 관리자센터를 통해 알기 쉽게 표시합니다.<br><br>' +
            '② 회원이 유료서비스를 이용하기 위해서는 회사가 정한 이용조건에 따라 이용요금을 지급하여야 합니다.<br><br><br>' +

            '<b>제 10조 지급 방법</b><br>' +
            '① 유료서비스 결제 방법은 각 호의 방법 중 가능한 방법으로 할 수 있습니다. 다만, 회사의 정책에 따라 회원별로 일부 결제 수단이 회사는 회원의 지급방법에 대하여 어떤 명목의 수수료도 추가하여 징수하지 않습니다.<br><br>' +
                '1. 선불카드, 직불카드, 신용카드 등의 각종 가드결제<br>' +
                '2. 폰뱅킹, 인터넷뱅킹, 메일뱅킹, 온라인 무통장 입금 등의 각종 계좌이체<br><br>' +
            '② 회사의 정책 및 제 1항의 결제업체(이동통신사, 카드사 등)의 기준에 따라 회원 당 월 누적 결제액 및 충전한도가 제한될 수 있습니다. 해당 기준을 초과한 경우 유료서비스의 추가 이용은 불가능할 수 있습니다.<br><br><br>' +

            '<b>제 11조 유료서비스의 제공 및 중단</b><br>' +
            '① 회사는 유료 서비스를 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.<br><br>' +
            '② 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 유료서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 회사는 제 3조에 정한 방법으로 회원에 통지합니다. 다만, 회사가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.<br><br>' +
            '③ 회사는 유료서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 유료서비스 제공화면에 공지한 바에 따릅니다.<br><br>' +
            '④ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 유료서비스를 제공할 수 없게 되는 경우에 회사는 제 3조에 정한 방법으로 회원에게 통지하고 회사는 합리적 조건에 따라 회원에게 보상합니다.<br><br><br>' +

            '<b>제 12조 유료 서비스의 변경</b><br>' +
            '① 회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부의 유료서비스를 변경할 수 있습니다. 다만, 변경된 내용이 중대하거나 회원에게 불리한 경우에는 회사가 해당 유료서비스를 제공받는 회원에게 제 3조에 정한 방법으로 통지합니다.<br><br>' +
            '② 회사는 전항에 따른 서비스 변경에 대한 동의를 거절한 회원에 대하여는 변경 전 서비스를 제공합니다. 다만, 그러한 서비스 제공이 불가능할 경우 해당 서비스의 제공을 중지하거나 계약을 해지할 수 있습니다. 이 경우 환불 등은 제 O조에 따라 진행됩니다.<br><br><br>' +

            '<h5><b>제 4장 계약 당사자의 의무</b></h5><br>' +
            '<b>제 13조 회사의 의무</b><br>' +
            '③ 회사는 계속적이고 안정적인 서비스의 제공을 위하여 본 약관의 내용을 준수하며, 회원에게 이익을 제공하기 위해 최선을 다하여 노력합니다.<br><br>' +
            '④ 회사는 서비스의 이용과 관련하여 회원이 불만이나 개선 의견을 제시하는 경우, 합리적인 절차에 따라 이를 검토하여 서비스에 도움이 되는 범위에서 이를 반영할 수 있습니다.<br><br>' +
            '⑤ 회사는 회원으로부터 제기되는 불만사항 및 의견이 정당하다고 판단되는 경우 이를 신속하게 처리하며, 이때 처리과정에 대해서 회원에게 메일 및 게시판 등의 방법으로 전달합니다. 즉시 처리가 곤란한 경우에는 그 사유와 처리기간을 회원에게 통보합니다.<br><br>' +
            '⑥ 회사는 회원이 서비스를 안심하고 이용할 수 있도록 정보통신망법과 개인정보보호법 등 관계법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다.<br><br><br>' +

            '<b>제 14조 회원의 의무</b><br>' +
            '① 회원은 관계 법령 및 본 약관에서 규정하는 사항과 회사가 정한 세부지침 등을 준수해야 합니다.<br><br>' +
            '② 회원은 아래 각 호에 해당하는 행위를 하여서는 안됩니다.<br><br>' +
                '1. 본 이용약관 제 8조 제 5항을 위반하는 행위<br>' +
                '2. 회사가 제공하는 서비스 이용방법에 의하지 아니하고 비정상적인 방법으로 서비스를 이용하거나 시스템에 접근하는 행위<br>' +
                '3. 리버스엔지니어링, 디컴파일, 디스어셈블 및 기타 일체의 가공행위를 통하여 서비스를 복제, 분해 또는 모방 기타 변형하는 행위<br>' +
                '4. 외설, 폭력적인 메시지, 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위<br>' +
                '5. 자동 접속 프로그램을 사용하는 등 정상적인 용법과 다른 방법으로 서비스를 이용하거나 정상적인 서비스를 방해하는 행위<br>' +
                '6. 이용신청 또는 변경 시, 허위 사실을 기재하거나 다른 회원 또는 개인의 개인정보 및 아이디, 비밀번호, 계좌정보 등을 무단으로 수집하거나 부정하게 사용하는 행위<br>' +
                '7. 회사의 직원이나 운영자를 가장하거나 사칭하여 또는 타인의 명의를 도용하여 글을 게시하거나 메일을 발송하는 행위<br>' +
                '8. 서비스 운영을 고의로 방해하는 경우<br>' +
                '9. 자기 또는 타인에게 재산상의 이익을 주거나 타인에게 손해를 가할 목적으로 허위의 정보를 유통시키는 행위<br>' +
                '10. 서비스의 임의 해지, 재가입 등을 반복적으로 행함으로써 회사가 제공하는 할인쿠폰, 이벤트 혜택 등의 경제상의 이익을 부당하게 수취하는 행위<br>' +
                '11. 제 3자의 명예를 손상시키거나 저작권 등 지적재산권에 대한 침해 등의 방법으로 업무를 방해하는 행위<br>' +
                '12. 본인 아닌 제 3자에게 자신의 계정 접속권한을 부여하거나 회사의 사전 동의 없이 계정 및 본 약관에 따른 권리 또는 의무의 전부 또는 일부를 제 3자에게 양도, 임대하거나 담보로 제공하는 행위<br>' +
                '13. 기타 불법적이거나 부당한 방법으로 회사의 업무를 방해하는 행위<br><br>' +
            '③ 회사는 회원이 전항에서 금지한 행위를 한 경우, 위반 행위의 경중에 따라 서비스의 이용정지, 계약의 해지 등 서비스 이용 제한, 수사 기관에 고발 조치 등 합당한 조치를 취할 수 있습니다.<br><br><br>' +

            '<h5><b>제 5장 청약철회, 계약해지 및 이용제한 등</b></h5><br>' +
            '<b>제 15조 회원의 청약철회와 계약해제, 해지</b><br>' +
            '① 회사와 이 약관 제 11조에 따른 유료서비스 이용계약을 체결한 회원은 성립한 날로부터 7일 이내에, 체결된 이용계약이 다르게 이행된 경우에는 유료서비스를 이용할 수 있는 날로부터 3월 이내 또는 그 사실을 알거나 알 수 있었던 날로부터 30일 이내에 청약을 철회할 수 있습니다. 다만, 회사의 유료서비스는 콘텐츠산업진흥법 등에서 규정하는 청약철회가 불가능한 서비스가 포함될 수 있고, 이 경우 회사는 청약철회권의 제한을 위해 동 법에 따라 다음 각 호 중 하나의 조치를 취합니다.<br><br>' +
                '1. 청약의 철회가 불가능한 유료서비스에 대한 사실을 표시사항에 포함<br>' +
                '2. 시용상품을 제공<br>' +
                '3. 한시적 또는 일부이용 등의 방법을 제공<br><br>' +
            '② 회원은 다음 각 호의 사유가 있을 때 유료서비스 이용계약을 해지 또는 해제할 수 있습니다.<br><br>' +
                '1. 유료서비스의 하자를 회사가 보완, 수정할 수 없는 경우 유료서비스를 공급받은 날로부터 1개월 이내<br>' +
                '2. 유료서비스 이용 회원이 이 약관 또는 서비스 약관의 변경에 동의하지 않아 회원탈퇴 또는 유료서비스 이용계약을 해지하는 경우<br><br>' +
            '③ 제 2항의 계약해제, 해지는 회원이 회사에 그 의사를 표시한 때에 효력이 발생합니다.<br><br>' +
            '④ 회사는 제 3항에 따라 회원이 표시한 계약해제, 해지의 의사표시를 수신한 후 지체 없이 이러한 사실을 회원에게 회신합니다.<br><br>' +
            '⑤ 회원은 제 2항 제 1호의 사유로 계약해제, 해지의 의사표시를 하기 전에 상당한 기간을 정하여 서비스 이용의 하자에 대한 치유를 요구할 수 있습니다. 다만, 회사가 하자의 치유가 불가능하다고 판단하는 경우에는 즉시 그 사실을 회원에게 통지하고 유료서비스 이용계약을 해제, 해지할 수 있습니다.<br><br><br>' +

            '<b>제 16조 회원의 계약해제, 해지의 효과</b><br>' +
            '① 회사는 회원에게 유료서비스의 계약해제, 해지의 의사표시에 대하여 회신한 날로부터 3 영업일 이내에 캐시로 환급합니다.<br><br>' +
            '② 회사가 제 1항에 따라 환급할 경우에 회원이 유료서비스 이용으로부터 얻은 이익에 해당하는 금액을 공제하고 환급할 수 있습니다.<br><br><br>' +

            '<b>제 17조 캐시의 환불</b><br>' +
            '① 회사는 회원이 잔여 캐시에 대한 환불을 요구할 경우, 아직 사용되지 아니한 회원의 캐시 잔액에 해당하는 금액을 지급합니다. 단, 회사는 결제 수단에 따라 필요한 경우 회원에게 입금사실 확인을 요청할 수 있습니다.<br><br>' +
            '② 회사는 위 대금을 환급함에 있어서 회원이 신용카드 또는 전자화폐 등의 결제수단으로 재화 등의 대금을 지급한 때에는 지체 없이 당해 결제수단을 제공한 사업자로 하여금 재화 등의 대금의 청구를 정지 또는 취소하도록 요청합니다.<br><br>' +
            '③ 무상캐시는 전항의 환불 대상에서 제외됩니다.<br><br><br>' +

            '<h5><b>제 18조 서비스 이용제한 및 이용중지 등</b></h5><br>' +
            '① 회사는 회원이 다음 각 호의 1에 해당하는 경우 해당 회원에 대한 서비스의 일부 또는 전부를 제한할 수 있습니다. 이 경우 회사는 해지사유와 제한기간을 밝혀 제 3조에서 정한 방법으로 해지의사를 통지합니다. 다만 회사는 해당 회원에게 사전에 해지사유에 대한 의견진술의 기회를 부여할 수 있습니다.<br><br>' +
                '1. 제 5조 1항에서 정하고 있는 이용계약의 승낙거부사유가 있음이 확인된 경우<br>' +
                '2. 제 18조 제 2항 각 호에 해당하는 행위를 하는 경우<br>' +
                '3. 부정 결제가 의심되는 경우<br>' +
                '4. 기타 이 약관에 명시된 회원의 의무 등 세부지침을 위반하는 경우<br><br>' +
            '② 전항에 따라 회원의 서비스 이용을 제한 하는 경우, 회사는 경고제한, 활동제한, 영구제한 등으로 서비스 이용을 제한할 수 있습니다.<br><br>' +
            '③ 이용계약이 종료되는 경우 회원의 포인트 (기타 현금성 포인트 포함)는 즉시 소멸되며, 환불 등의 처리는 회사의 환불규정에 의합니다.<br><br>' +
            '④ 이용계약의 종료와 관련하여 발생한 손해는 이용계약이 종료된 해당 회원이 책임을 부담하여야 하고 회사는 일체의 책임을 지지 않습니다.<br><br><br>' +

            '<b>제 19조 이용계약의 해지</b><br>' +
            '① 회원은 언제든지 회사에게 해지의사를 통지함으로써 이용계약을 해지할 수 있습니다.<br><br>' +
            '② 이용계약은 회원의 해지의사가 회사에 도달한 때에 종료됩니다.<br><br>' +
            '③ 서비스 탈퇴가 완료되면 관계 법령 및 개인정보처리방침에 따라 회사가 보유해야 하는 정보를 제외한 나머지 회원 관련 정보는 즉시 삭제됩니다.<br><br>' +
            '④ 회사는 회원이 유료서비스를 이용한 경우 회원에 대하여 계약 해지가 완료된 시점으로부터 3 영업일 이내에 제 19조, 제 21조에 정한 방법으로 환불합니다.<br><br>' +
            '⑤ 본 항에 따라 해지를 한 회원은 이 약관이 정하는 회원가입 절차와 관련조항에 따라 회원으로 다시 가입할 수 있습니다.<br><br><br>' +

            '<b>제 20조 소멸시효</b><br>' +
            '캐시는 마지막 이용일로부터 5년 경과 시까지 이용하지 않을 경우 상사소멸시효에 따라 소멸될 수 있습니다. 다만, 무상으로 제공하는 캐시의 경우는 회사의 정책에 따라 소멸될 수 있습니다.<br><br>' +

            '<h5><b>제 6장 기타</b></h5><br>' +
            '<b>제 21조 손해배상</b><br>' +
            '① 회사는 서비스 제공과 관련하여 회사의 고의 또는 과실로 인해 회원에게 손해가 발생할 경우, 본 약관 및 관계법령이 규정하는 범위 내에서 회원에게 그 손해를 배상합니다.<br><br>' +
            '② 회원이 고의 또는 과실로 본 약관 또는 관계법령을 위반하여 회사에 손해가 발생한 경우, 회원은 본 약관 및 관계법령이 규정하는 범위 내에서 그 손해를 배상합니다.<br><br>' +
            '③ 회사는 법률상 허용되는 한도 내에서 간접 손해, 영업손해, 특별 손해, 결과적 손해, 징계적 손해, 및 징벌적 손해에 대한 책임을 부담하지 않습니다.<br><br><br>' +

            '<b>제 22조 회사의 면책</b><br>' +
            '① 회사가 천재지변 또는 이에 준하는 불가항력, 정보통신설비의 보수점검, 교체 또는 고장, 통신의 두절 등으로 인하여 일시적 또는 종국적으로 서비스를 제공할 수 없는 경우, 회사는 서비스 제공에 관한 책임으로부터 면제됩니다.<br><br>' +
            '② 회사는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다.<br><br>' +
            '③ 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.<br><br>' +
            '④ 회사는 회원이 다른 회원이 게재한 정보, 자료, 사실의 정확성 등을 신뢰함으로써 입은 손해에 대하여 책임을 지지 않습니다.<br><br>' +
            '⑤ 회사는 회원이 서비스를 이용함으로써 기대되는 수익을 얻지 못하거나 서비스를 통해 얻은 자료를 이용하여 발생한 손해에 대해서는 책임을 부담하지 않습니다.<br><br>' +
            '⑥ 컴퓨터와 통신 시스템의 오류에 따라 서비스의 일시중지 또는 중단이 발생할 수 있으며, 회사는 이에 다른 서비스의 오류 없음이나 회원이 등록한 정보 등의 손실이 발생하지 않음을 보장하지 않습니다.<br><br>' +
            '⑦ 회사는 회원의 게시물을 등록 전에 사전심사 하거나 상시적으로 게시물의 내용을 확인 또는 검토하여야 할 의무가 없으며, 그 결과에 대한 책임을 지지 아니합니다.<br><br>' +
            '⑧ 회사는 회원 간 또는 회원과 제3자 상호간에 서비스를 매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.<br><br>' +
            '⑨ 회사는 회원 상호간 또는 회원과 제 3자 상호 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며 이로 인한 손해를 배상할 책임도 없습니다.<br><br>' +
            '⑩ 회사는 무료로 제공되는 서비스 이용과 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다.<br><br>' +
            '⑪ 회사는 회원의 컴퓨터 환경이나 회사의 관리 범위에 있지 아니한 보안 문제로 인하여 발생하는 제반 문제 또는 현재의 보안기술 수준으로 방어가 곤란한 네트워크 해킹 등 회사의 귀책사유 없이 발생하는 문제에 대해서 책임을 지지 않습니다.<br><br>' +
            '⑫ 기타 회사의 고의 또는 과실이 없는 사유로 인해 발생한 손해에 대해 책임 지지 않습니다.<br><br><br>' +

            '<b>제 23조 준거법 및 재판관할</b><br>' +
            '① 회사는 대한민국 내에 설치된 서버를 기반으로 서비스를 제공, 관리하고 있습니다. 따라서 회사는 대한민국의 영토 이외의 지역의 회원이 서비스를 이용하고자 하는 경우 서비스의 품질 또는 사용의 완전성을 보장하지 않습니다. 따라서 회원은 대한민국 영토 이외의 지역에서 서비스를 이용하고자 하는 경우 스스로의 판단과 책임에 따라서 이용 여부를 결정하여야 하고, 특히 서비스의 이용과정에서 현지 법령을 준수할 책임은 회원에게 있습니다.<br><br>' +
            '② 회사와 회원 간에 제기된 일체의 분쟁은 대한민국법을 준거법으로 하며, 민사소송법 상의 법원을 관할법원으로 합니다.';
    }
    if(location.href.indexOf('data') !== -1) {
        console.log('개인정보 취급방침');
        $('.card-header')[0].innerHTML = '개인정보 처리방침';
        $('.card-body')[0].innerHTML =
            '<h5><b>㈜젤리랩 개인정보 처리방침</b></h5><br>' +
            '㈜젤리랩(이하 ‘회사’)는 이용자의 ‘동의를 기반으로 개인정보를 수집, 이용 및 제공’하고 있으며, ‘이용자의 권리 (개인정보 자기결정권)를 적극적으로 보장’합니다.<br><br>' +
            '회사는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하고 있습니다.<br><br>' +
            '“개인정보 처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미합니다.<br><br>' +
            '회사는 개인정보처리방침을 통하여 이용자의 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.<br><br>' +

            '<b>1. 개인정보의 수집 항목</b><br><br>' +
            '① 회원가입 시 또는 서비스 이용 과정에서 홈페이지 또는 어플리케이션 등을 통해 필요한 최소한의 개인정보를 아래와 같이 수집하고 있습니다.<br>' +
                '1) 회원 가입 시 수집하는 개인정보의 범위<br>' +
                '- 필수항목: 이메일 (로그인 ID), 비밀번호, 전화번호, 닉네임, IMEI (이용자 기기의 고유한 정보를 원래 값을 확인하지 못하도록 안전하게 변환 후 이용)<br>' +
                '- 선택항목: 생년월일, 성별<br>' +
                '2) 소셜 계정 회원가입 시 수집하는 개인정보의 범위<br>' +
                '- 제공받아 저장하는 정보: 닉네임, 아이디(이메일 형식 또는 카카오 아이디), 고유번호<br>' +
                '- 선택항목: 휴대폰번호<br>' +
                '3) 맞춤 서비스 제공을 위한 정보수집<br>' +
                '- 선택항목: 위치 정보<br>' +
                '4) 서비스 이용과정이나 사업처리 과정에서의 자동생성 정보<br>' +
                '- 서비스 이용기록, 접속로그, 쿠키, 접속 IP정보, 결제기록, 방문일시, 부정이용기록, 단말기정보(OS, 화명사이즈, 디바이스 아이디)<br>' +
                '5) 고객문의 시 수집하는 개인정보의 범위<br>' +
                '- 오류, 기타 문의 시: 이메일, 전화번호<br><br>' +
            '② 일부 서비스에서는 특화된 여러 기능들을 제공하기 위해 공통으로 수집하는 정보 외 이용자 동의 후 추가적인 개인정보를 수집할 수 있습니다.<br><br>' +
            '③ 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보 (인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 의료정보 등)는 수집하지 않습니다.<br>' +
                '<b>필수정보란?</b> 해당 서비스의 본질적 기능을 수행하기 위한 정보<br>' +
                '<b>선택정보란?</b> 보다 특화된 서비스를 제공하기 위해 추가 수집하는 정보 (선택 정보를 입력하지 않은 경우에도 서비스 이용 제한은 없습니다.)<br><br>' +

            '<b>2. 개인정보의 수집 방법</b><br><br>' +
            '개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해 개인정보를 수집합니다.<br><br>' +
            '① 회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우<br><br>' +
            '② 제휴 서비스 또는 단체 등으로부터 개인정보를 제공받은 경우<br><br>' +
            '③ 고객센터를 통한 상담 과정에서 웹페이지, 메일, 팩스, 전화 등<br><br>' +
            '④ 온,오프라인에서 진행되는 이벤트/행사 등 참여<br><br>' +


            '<b>3. 개인정보의 이용목적</b><br><br>' +
            '이용자의 개인정보를 다음과 같은 목적으로만 이용하며, 목적이 변경될 경우에는 반드시 사전에 이용자에게 동의를 구하겠습니다.<br><br>' +
            '① 서비스 기본 기능 제공<br>' +
                '1) 신규 서비스 개발<br>' +
                '2)컨텐츠 및 특정 맞춤 서비스 제공<br>' +
                '3) 서비스 개선에 활용<br><br>' +
            '② 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산<br>' +
                '1) 본인 인증<br>' +
                '2) 구매 및 요금 결제, 요금 추심<br><br>' +
            '③ 회원 관리<br>' +
                '1) 회원제 서비스 이용에 따른 본인 확인 및 개인식별<br>' +
                '2) 불량회원의 부정 이용 방지와 비인가 사용방지<br>' +
                '3) 가입의사 확인<br>' +
                '4) 가입 및 가입횟수 제한<br>' +
                '5) 분쟁 조정을 위한 기록보존<br>' +
                '6) 불만처리 등 민원처리<br>' +
                '7) 공지사항 전달<br><br>' +
            '④ 마케팅/광고의 활용<br>' +
                '1) 서비스 이용 기록과 접속 빈도 분석, 통계학적 특성에 따른 서비스 제공 및 광고 게재<br>' +
                '2) 이벤트 및 광고성 정보 전달 및 참여기회 제공<br><br>' +

            '<b>4. 개인정보 제 3자 제공</b><br>' +
            '회사는 이용자의 별도 동의가 있는 경우나 법령에 규정된 경우를 제외하는 이용자의 개인정보를 제 3자에게 제공하지 않습니다. 다만 다음의 경우는 예외로 하고 있습니다.<br><br>' +
            '① 서비스 제공에 따른 요금정산을 위해 필요한 경우<br><br>' +
            '② 법령의 규정에 의거하거나, 수사/재판/행정상 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우<br><br>' +
            '③ 통계작성, 학술연구나 시장조사를 위하여 특정 개인을 식별할 수 없는 형태로 가공하여 제공하는 경우<br><br>' +
            '④ 금융실명거래 및 비밀보장에 관한 법률, 신용정보의 이용 및 보호에 관한 법률, 전기통신기본법, 전기통신사업법, 지방세법, 소비자보호법, 한국은행법, 형사소송법 등 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우<br><br>' +
            '⑤ 매각, 인수합병 등의 경우: 서비스제공자의 권리와 의무가 완전 승계 이전되는 경우 반드시 사전에 정당한 사유와 절차에 대해 상세하게 고지할 것이며, 이용자의 개인정보에 대한 동의 철회의 선택권을 부여합니다.<br><br>' +

            '<b>5. 개인정보 위탁처리(추후 보완)</b><br><br>' +
            '서비스 제공에 있어 반드시 필요한 업무 중 일부를 외부 업체로 하여금 수행하도록 개인정보를 위탁하고 있습니다. 그리고 위탁 받은 업체가 관계 법령을 위반하지 않도록 관리, 감독하고 있습니다.<br><br>' +

            '<b>6. 개인정보 보유 및 이용기간</b><br><br>' +
            '이용자의 개인정보는 개인정보의 수집, 이용목적이 달성되면 지체없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다. 이때 별도 저장 관리되는 개인정보는 절대 다른 목적으로는 이용되지 않습니다.<br><br>' +

            '① 회사 내부 방침에 의한 정보보유 사유<br><br>' +
                '1) 부정 이용 기록<br>' +
                '- 보존 이유: 부정 이용 방지<br>' +
                '- 보존 기간: 1년<br><br>' +
            '② 관련법령에 의한 정보보유 사유<br>' +
                '1) 서비스 이용 관련 개인정보 (서비스 방문 기록)<br>' +
                '- 보존 근거: 통신비밀보호법<br>' +
                '- 보존 기간: 3개월<br><br>' +
                '2) 표시/광고에 관한 기록<br>' +
                '- 보존 근거: 전자상거래 등에서의 소비자보호에 관한 법률<br>' +
                '- 보존 기간: 6개월<br><br>' +
                '3) 계약 또는 청약철회 등에 관한 기록<br>' +
                '- 보존 근거: 전자상거래 등에서의 소비자보호에 관한 법률<br>' +
                '- 보존 기간: 5년<br><br>' +
                '4) 대금결제 및 재화 등의 공급에 관한 기록<br>' +
                '- 전자상거래 등에서의 소비자보호에 관한 법률<br>' +
                '- 보존 기간: 5년<br><br>' +
                '5) 소비자의 불만 또는 분쟁처리에 관한 기록<br>' +
                '- 보존 근거: 전자상거래 등에서의 소비자보호에 관한 법률<br>' +
                '- 보존 기간: 3년<br><br>' +
                '6) 개인위치정보에 관한 기록<br>' +
                '- 보존 근거: 위치정보의 보호 및 이용 등에 관한 법률<br>' +
                '- 보존 기간: 6개월<br><br>' +
                '7) 전자금융 거래에 관한 기록<br>' +
                '- 보존 근거: 전자금융거래법<br>' +
                '- 보존 기간: 5년<br><br>' +
            '③ ‘개인정보 유효기간제’에 따라 1년간 서비스를 이용하지 않은 이용자의 개인정보를 별도로 분리 보관 또는 파기하며, 분리 보관된 개인정보는 4년간 보관 후 지체없이 파기합니다.<br><br>' +

            '<b>7. 개인정보 파기절차 및 방법</b><br><br>' +
            '① 파기 절차<br>' +
                '1) 이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 (종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 (보유 및 이용기간 참조) 일정기간 저장된 후 파기됩니다.<br>' +
                '2) 동 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.<br><br>' +
            '② 파기 방법<br>' +
                '1) 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.<br>' +
                '2) 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.<br><br>'+

            '<b>8. 이용자 및 법정대리인의 권리, 의무 및 그 행사방법</b><br><br>' +
            '① 이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며, 동의철회/가입 해지를 요청할 수도 있습니다.<br><br>' +
            '② 이용자 혹은 만 14세 미만 아동의 개인정보 조회, 수정을 위해서는 서비스 내 “개인정보변경”을, 가입 해지 (동의 철회)를 위해서는 서비스 내 “회원탈퇴”를 클릭하여 직접 열람, 정정 또는 탈퇴가 가능합니다. 혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.<br><br>' +
            '③ 이용자가 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제 3자에게 이미 제공한 경우에는 정정 처리결과를 제 3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다. 단, 다음과 같은 경우에는 예외적으로 개인정보의 열람 및 정정을 제한할 수 있습니다.<br><br>' +
                '1) 본인 또는 제 3자의 생명, 신체, 재산 또는 권익을 현저하게 해할 우려가 있는 경우<br>' +
                '2) 당해 서비스 제공자의 업무에 현저한 지장을 미칠 우려가 있는 경우<br>' +
                '3) 법령에 위반하는 경우<br><br>' +
            '④ 회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 “개인정보의 보유 및 이용기간”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.<br><br>' +
            '⑤ 회사는 이용자가 타인의 개인정보를 도용하여 회원가입 등을 하였음을 알게 된 때 지체없이 해당 아이디에 대한 서비스 이용정지 또는 회원탈퇴 등 필요한 조치를 취합니다. 또한 자신의 개인정보 도용을 인지한 회원이 해당 아이디에 대한 서비스 이용정지 또는 회원탈퇴를 요구하는 경우에도 회사는 즉시 조치를 취합니다.<br><br>' +
            '⑥ 이용자는 개인정보를 보호받을 권리와 함께 스스로를 보호하고 타인의 정보를 침해하지 않을 의무도 가지고 있습니다. 비밀번호를 포함한 개인정보가 유출되지 않도록 유의하시고 타인의 개인정보를 훼손하지 않도록 유의해 주세요. 만약 이 같은 책임을 다하지 못하고 타인의 정보 및 존엄성을 훼손할 시에는 “정보통신망이용촉진 및 정보보호 등에 관한 법률”, “개인정보보호법” 등에 의해 처벌받을 수 있습니다.<br><br>' +
            '⑦ 이용자는 개인정보를 최신의 상태로 정확하게 입력하여 불의의 사고를 예방해 주시기 바랍니다. 이용자가 입력한 부정확한 정보로 인해 발생하는 사고의 책임은 이용자 자신에게 있으며 타인 정보의 도용 등 허위정보를 입력할 경우 회원자격이 상실될 수 있습니다.<br><br>' +

            '<b>9. 개인정보의 자동 수집 장치의 설치, 운영 및 그 거부에 관한 사항</b><br><br>' +
            '쿠키란 웹 서버가 웹 브라우저에 보내어 저장했다가 서버의 부가적인 요청이 있을 때 다시 서버로 보내주는 문자열 정보로 회원의 컴퓨터 하드디스크에 저장되며 쿠키(cookie)에는 사용한 웹사이트의 정보 및 이용자의 개인정보가 담길 수 있습니다. 회사에서 운영하는 서비스는 인터넷을 통하여 회원의 정보를 저장하고 수시로 찾아내는 쿠키를 설치, 운용하고 있습니다.<br><br>' +
            '① 회사의 쿠키 운용<br>' +
                '1) 개인의 관심 분야에 따라 차별화 된 정보 제공<br>' +
                '2) 서비스 이용 내역을 추적, 분석하여 개인 맞춤 서비스 제공 및 서비스 개편<br>' +
                '3) 접속 빈도 또는 머문 시간 등을 분석하여 이용자의 취향과 관심분야를 파악하며 타겟 마케팅에 활용<br>' +
                '4) 이용자가 선호하는 설정 등을 저장하여 이용자에게 보다 빠른 웹 환경 지원<br><br>' +
            '② 쿠키 수집 거부<br>' +
            '쿠키에는 이름, 전화번호 등 개인을 식별하는 정보를 저장하지 않으며, 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키 설치를 거부하는 경우 서비스 제공에 어려움이 발생할 수도 있습니다.<br><br>' +
            '③ 설정 방법<br>' +
                '1) Internet Explorer : 웹 브라우저 상단 도구 메뉴 > 인터넷 옵션 > 개인정보 > 설정<br>' +
                '2) Chrome: 웹 브라우저 우측 설정 메뉴 > 화면 하단의 고급 설정 표시 > 개인정보의 콘텐츠 설정 버튼 > 쿠키<br><br>' +

            '<b>10. 개인정보 안정성 확보조치 (보완필요)</b><br><br>' +
            '① 기술적 대체<br>' +
            '회사는 이용자의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다.<br><br>' +
                '1) 이용자의 개인정보는 비밀번호에 의해 보호되며 파일 및 전송데이터를 암호화하거나 파일 잠금기능(Lock)을 사용하여 중요한 데이터는 별도의 보안기능을 통해 보호되고 있습니다.<br>' +
                '2) 회사는 백신프로그램을 이용하여 컴퓨터바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다. 백신프로그램은 주기적으로 업데이트되며 갑작스런 바이러스가 출현할 경우 백신이 나오는 즉시 이를 제공함으로써 개인정보가 침해되는 것을 방지하고 있습니다.<br>' +
                '3) 회사는 암호 알고리즘을 이용하여 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치(SSL)를 채택하고 있습니다.<br>' +
                '4) 해킹 등 외부침입에 대비하여 각 서버마다 침입차단시스템 및 취약점 분석시스템 등을 이용하여 보안에 만전을 기하고 있습니다.<br><br>' +
            '② 관리적 대책<br>' +
                '1) 회사는 고객의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다. 그 최소한의 인원에 해당하는 자는 다음과 같습니다.<br>' +
                '- 이용자를 직접 상대로 하여 마케팅 업무를 수행하는 자<br>' +
                '- 고객의 불만 및 이용문의 처리 업무를 수행하는 자<br>' +
                '- 개인정보보호책임자 등 개인정보관리업무를 수행하는 자<br>' +
                '- 기타 업무상 개인정보의 취급이 불가피한 자<br>' +
                '2) 입사 시 전 직원의 보안서약서를 통하여 사람에 의한 정보유출을 사전에 방지하고 개인정보처리방침에 대한 이행사항 및 직원의 준수여부를 감사하기 위한 내부절차를 마련하고 있습니다.<br>' +
                '3) 개인정보 관련 취급자의 업무 인수인계는 보안이 유지된 상태에서 철저하게 이뤄지고 있으며 입사 및 퇴사 후 개인정보 사고에 대한 책임을 명확화하고 있습니다. 회사는 이용자 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다.<br>' +
                '4) 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출, 변조, 훼손이 유발될 경우 회사는 즉각 이용자에게 사실을 알리고 적절한 대책과 보상을 강구할 것입니다.<br><br>' +

            '<b>개인정보관리책임자 및 담당자의 연락처</b><br><br>' +
            '회사는 이용자의 개인정보보호를 가장 중요시하며, 회원의 개인정보가 훼손, 침해 또는 누설되지 않도록 최선을 다하고 있습니다. 고객의 개인정보를 처리하는 책임자 및 담당자는 다음과 같으며 개인정보 관련 문의사항에 신속하고 성실하게 답변해드리고 있습니다.<br><br>' +
                '[개인정보보호책임자]' +
                '- 성명: 유나리<br>' +
                '- 직위: 대표이사<br>' +
                '- 전자우편:<br>'

    }
    $('.back').click(function() {
        history.back();
    });
})
