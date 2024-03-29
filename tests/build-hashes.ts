export function getBuildHashes (key: string) {
  const map: Record<string, Record<string, string>> = {
    output1: {
      '100x100-fg-square-svg-bg-square-svg': '509366388',
      '100x100-fg-square-svg-bg-square-png': '1441172024',
      '100x100-fg-square-png-bg-square-svg': '1420338362',
      '100x100-fg-square-png-bg-square-png': '674438392',
      '100x200-fg-square-svg-bg-square-svg': '556207243',
      '100x200-fg-square-svg-bg-square-png': '1551221177',
      '100x200-fg-square-png-bg-square-svg': '57076453',
      '100x200-fg-square-png-bg-square-png': '2003450761',
      '100x600-fg-square-svg-bg-square-svg': '1714486659',
      '100x600-fg-square-svg-bg-square-png': '400077816',
      '100x600-fg-square-png-bg-square-svg': '357234771',
      '100x600-fg-square-png-bg-square-png': '826902232',
      '200x100-fg-square-svg-bg-square-svg': '26471047',
      '200x100-fg-square-svg-bg-square-png': '464132171',
      '200x100-fg-square-png-bg-square-svg': '518843539',
      '200x100-fg-square-png-bg-square-png': '1820940965',
      '200x200-fg-square-svg-bg-square-svg': '1355664832',
      '200x200-fg-square-svg-bg-square-png': '24393242',
      '200x200-fg-square-png-bg-square-svg': '1777224722',
      '200x200-fg-square-png-bg-square-png': '55613888',
      '200x600-fg-square-svg-bg-square-svg': '401952377',
      '200x600-fg-square-svg-bg-square-png': '637143108',
      '200x600-fg-square-png-bg-square-svg': '4617301',
      '200x600-fg-square-png-bg-square-png': '139913258',
      '600x100-fg-square-svg-bg-square-svg': '820308253',
      '600x100-fg-square-svg-bg-square-png': '1625352302',
      '600x100-fg-square-png-bg-square-svg': '1285300599',
      '600x100-fg-square-png-bg-square-png': '1134928034',
      '600x200-fg-square-svg-bg-square-svg': '1775178209',
      '600x200-fg-square-svg-bg-square-png': '806381754',
      '600x200-fg-square-png-bg-square-svg': '1577188329',
      '600x200-fg-square-png-bg-square-png': '170821652',
      '600x600-fg-square-svg-bg-square-svg': '1308686328',
      '600x600-fg-square-svg-bg-square-png': '1335442591',
      '600x600-fg-square-png-bg-square-svg': '1088144869',
      '600x600-fg-square-png-bg-square-png': '430620442',
      '100x100-fg-square-svg-bg-rect-vert-svg': '611975301',
      '100x100-fg-square-svg-bg-rect-vert-png': '641037682',
      '100x100-fg-square-png-bg-rect-vert-svg': '999290630',
      '100x100-fg-square-png-bg-rect-vert-png': '2052620574',
      '100x200-fg-square-svg-bg-rect-vert-svg': '737168870',
      '100x200-fg-square-svg-bg-rect-vert-png': '1251167909',
      '100x200-fg-square-png-bg-rect-vert-svg': '1784252091',
      '100x200-fg-square-png-bg-rect-vert-png': '85611531',
      '100x600-fg-square-svg-bg-rect-vert-svg': '1701800167',
      '100x600-fg-square-svg-bg-rect-vert-png': '2033162584',
      '100x600-fg-square-png-bg-rect-vert-svg': '492631507',
      '100x600-fg-square-png-bg-rect-vert-png': '380421496',
      '200x100-fg-square-svg-bg-rect-vert-svg': '1798637876',
      '200x100-fg-square-svg-bg-rect-vert-png': '821860899',
      '200x100-fg-square-png-bg-rect-vert-svg': '1818395789',
      '200x100-fg-square-png-bg-rect-vert-png': '818308653',
      '200x200-fg-square-svg-bg-rect-vert-svg': '1740931498',
      '200x200-fg-square-svg-bg-rect-vert-png': '82178421',
      '200x200-fg-square-png-bg-rect-vert-svg': '5796859',
      '200x200-fg-square-png-bg-rect-vert-png': '471141445',
      '200x600-fg-square-svg-bg-rect-vert-svg': '1222142754',
      '200x600-fg-square-svg-bg-rect-vert-png': '909167965',
      '200x600-fg-square-png-bg-rect-vert-svg': '264345736',
      '200x600-fg-square-png-bg-rect-vert-png': '82852189',
      '600x100-fg-square-svg-bg-rect-vert-svg': '521798538',
      '600x100-fg-square-svg-bg-rect-vert-png': '107595350',
      '600x100-fg-square-png-bg-rect-vert-svg': '1916123662',
      '600x100-fg-square-png-bg-rect-vert-png': '1664023014',
      '600x200-fg-square-svg-bg-rect-vert-svg': '1850608136',
      '600x200-fg-square-svg-bg-rect-vert-png': '793780578',
      '600x200-fg-square-png-bg-rect-vert-svg': '1797659552',
      '600x200-fg-square-png-bg-rect-vert-png': '670895240',
      '600x600-fg-square-svg-bg-rect-vert-svg': '768607179',
      '600x600-fg-square-svg-bg-rect-vert-png': '630558355',
      '600x600-fg-square-png-bg-rect-vert-svg': '845335938',
      '600x600-fg-square-png-bg-rect-vert-png': '213240742',
      '100x100-fg-square-svg-bg-rect-hor-svg': '2095567100',
      '100x100-fg-square-svg-bg-rect-hor-png': '1764916315',
      '100x100-fg-square-png-bg-rect-hor-svg': '619626674',
      '100x100-fg-square-png-bg-rect-hor-png': '1879004011',
      '100x200-fg-square-svg-bg-rect-hor-svg': '651765887',
      '100x200-fg-square-svg-bg-rect-hor-png': '1258669028',
      '100x200-fg-square-png-bg-rect-hor-svg': '1085882489',
      '100x200-fg-square-png-bg-rect-hor-png': '1878718516',
      '100x600-fg-square-svg-bg-rect-hor-svg': '1030642063',
      '100x600-fg-square-svg-bg-rect-hor-png': '1061666910',
      '100x600-fg-square-png-bg-rect-hor-svg': '1986953942',
      '100x600-fg-square-png-bg-rect-hor-png': '936799566',
      '200x100-fg-square-svg-bg-rect-hor-svg': '248713053',
      '200x100-fg-square-svg-bg-rect-hor-png': '154958908',
      '200x100-fg-square-png-bg-rect-hor-svg': '1230213775',
      '200x100-fg-square-png-bg-rect-hor-png': '1112726508',
      '200x200-fg-square-svg-bg-rect-hor-svg': '1647204003',
      '200x200-fg-square-svg-bg-rect-hor-png': '1274450772',
      '200x200-fg-square-png-bg-rect-hor-svg': '1778062105',
      '200x200-fg-square-png-bg-rect-hor-png': '762144454',
      '200x600-fg-square-svg-bg-rect-hor-svg': '726384135',
      '200x600-fg-square-svg-bg-rect-hor-png': '1112775638',
      '200x600-fg-square-png-bg-rect-hor-svg': '78645288',
      '200x600-fg-square-png-bg-rect-hor-png': '1083431504',
      '600x100-fg-square-svg-bg-rect-hor-svg': '618761808',
      '600x100-fg-square-svg-bg-rect-hor-png': '706312691',
      '600x100-fg-square-png-bg-rect-hor-svg': '1913045395',
      '600x100-fg-square-png-bg-rect-hor-png': '846011299',
      '600x200-fg-square-svg-bg-rect-hor-svg': '1445551675',
      '600x200-fg-square-svg-bg-rect-hor-png': '483713164',
      '600x200-fg-square-png-bg-rect-hor-svg': '847975502',
      '600x200-fg-square-png-bg-rect-hor-png': '1280200358',
      '600x600-fg-square-svg-bg-rect-hor-svg': '1981514860',
      '600x600-fg-square-svg-bg-rect-hor-png': '445852915',
      '600x600-fg-square-png-bg-rect-hor-svg': '233830644',
      '600x600-fg-square-png-bg-rect-hor-png': '41002604',
      '100x100-fg-rect-vert-svg-bg-square-svg': '194845749',
      '100x100-fg-rect-vert-svg-bg-square-png': '1171782958',
      '100x100-fg-rect-vert-png-bg-square-svg': '1856170102',
      '100x100-fg-rect-vert-png-bg-square-png': '707748280',
      '100x200-fg-rect-vert-svg-bg-square-svg': '107607355',
      '100x200-fg-rect-vert-svg-bg-square-png': '217396041',
      '100x200-fg-rect-vert-png-bg-square-svg': '1465398730',
      '100x200-fg-rect-vert-png-bg-square-png': '1321844680',
      '100x600-fg-rect-vert-svg-bg-square-svg': '165496951',
      '100x600-fg-rect-vert-svg-bg-square-png': '1912884982',
      '100x600-fg-rect-vert-png-bg-square-svg': '371545854',
      '100x600-fg-rect-vert-png-bg-square-png': '1190060073',
      '200x100-fg-rect-vert-svg-bg-square-svg': '794281677',
      '200x100-fg-rect-vert-svg-bg-square-png': '1785692096',
      '200x100-fg-rect-vert-png-bg-square-svg': '1120562504',
      '200x100-fg-rect-vert-png-bg-square-png': '1606594122',
      '200x200-fg-rect-vert-svg-bg-square-svg': '2088130862',
      '200x200-fg-rect-vert-svg-bg-square-png': '1409168234',
      '200x200-fg-rect-vert-png-bg-square-svg': '1283446941',
      '200x200-fg-rect-vert-png-bg-square-png': '2115523787',
      '200x600-fg-rect-vert-svg-bg-square-svg': '784179803',
      '200x600-fg-rect-vert-svg-bg-square-png': '676098584',
      '200x600-fg-rect-vert-png-bg-square-svg': '1297441963',
      '200x600-fg-rect-vert-png-bg-square-png': '903352054',
      '600x100-fg-rect-vert-svg-bg-square-svg': '1561838153',
      '600x100-fg-rect-vert-svg-bg-square-png': '30668163',
      '600x100-fg-rect-vert-png-bg-square-svg': '1458877084',
      '600x100-fg-rect-vert-png-bg-square-png': '1949056505',
      '600x200-fg-rect-vert-svg-bg-square-svg': '1819727181',
      '600x200-fg-rect-vert-svg-bg-square-png': '964418154',
      '600x200-fg-rect-vert-png-bg-square-svg': '807134114',
      '600x200-fg-rect-vert-png-bg-square-png': '957785481',
      '600x600-fg-rect-vert-svg-bg-square-svg': '1457109853',
      '600x600-fg-rect-vert-svg-bg-square-png': '1655933265',
      '600x600-fg-rect-vert-png-bg-square-svg': '2007786639',
      '600x600-fg-rect-vert-png-bg-square-png': '129558758',
      '100x100-fg-rect-vert-svg-bg-rect-vert-svg': '1369018374',
      '100x100-fg-rect-vert-svg-bg-rect-vert-png': '1501679044',
      '100x100-fg-rect-vert-png-bg-rect-vert-svg': '1986810934',
      '100x100-fg-rect-vert-png-bg-rect-vert-png': '440004686',
      '100x200-fg-rect-vert-svg-bg-rect-vert-svg': '1893696660',
      '100x200-fg-rect-vert-svg-bg-rect-vert-png': '1860934051',
      '100x200-fg-rect-vert-png-bg-rect-vert-svg': '1856595818',
      '100x200-fg-rect-vert-png-bg-rect-vert-png': '110516388',
      '100x600-fg-rect-vert-svg-bg-rect-vert-svg': '563223455',
      '100x600-fg-rect-vert-svg-bg-rect-vert-png': '244659286',
      '100x600-fg-rect-vert-png-bg-rect-vert-svg': '781076188',
      '100x600-fg-rect-vert-png-bg-rect-vert-png': '1273552585',
      '200x100-fg-rect-vert-svg-bg-rect-vert-svg': '1500490592',
      '200x100-fg-rect-vert-svg-bg-rect-vert-png': '2116318354',
      '200x100-fg-rect-vert-png-bg-rect-vert-svg': '1265584536',
      '200x100-fg-rect-vert-png-bg-rect-vert-png': '1393020936',
      '200x200-fg-rect-vert-svg-bg-rect-vert-svg': '1957244988',
      '200x200-fg-rect-vert-svg-bg-rect-vert-png': '87744763',
      '200x200-fg-rect-vert-png-bg-rect-vert-svg': '799100806',
      '200x200-fg-rect-vert-png-bg-rect-vert-png': '2045374650',
      '200x600-fg-rect-vert-svg-bg-rect-vert-svg': '1631526084',
      '200x600-fg-rect-vert-svg-bg-rect-vert-png': '96049007',
      '200x600-fg-rect-vert-png-bg-rect-vert-svg': '1443417944',
      '200x600-fg-rect-vert-png-bg-rect-vert-png': '486446819',
      '600x100-fg-rect-vert-svg-bg-rect-vert-svg': '826603678',
      '600x100-fg-rect-vert-svg-bg-rect-vert-png': '1243585855',
      '600x100-fg-rect-vert-png-bg-rect-vert-svg': '821800051',
      '600x100-fg-rect-vert-png-bg-rect-vert-png': '188632651',
      '600x200-fg-rect-vert-svg-bg-rect-vert-svg': '828436198',
      '600x200-fg-rect-vert-svg-bg-rect-vert-png': '1093290830',
      '600x200-fg-rect-vert-png-bg-rect-vert-svg': '165432597',
      '600x200-fg-rect-vert-png-bg-rect-vert-png': '1493267219',
      '600x600-fg-rect-vert-svg-bg-rect-vert-svg': '66724160',
      '600x600-fg-rect-vert-svg-bg-rect-vert-png': '1117288285',
      '600x600-fg-rect-vert-png-bg-rect-vert-svg': '992248138',
      '600x600-fg-rect-vert-png-bg-rect-vert-png': '875437170',
      '100x100-fg-rect-vert-svg-bg-rect-hor-svg': '1906227901',
      '100x100-fg-rect-vert-svg-bg-rect-hor-png': '1506646149',
      '100x100-fg-rect-vert-png-bg-rect-hor-svg': '1224007966',
      '100x100-fg-rect-vert-png-bg-rect-hor-png': '1902402299',
      '100x200-fg-rect-vert-svg-bg-rect-hor-svg': '1177171527',
      '100x200-fg-rect-vert-svg-bg-rect-hor-png': '1038718746',
      '100x200-fg-rect-vert-png-bg-rect-hor-svg': '544826664',
      '100x200-fg-rect-vert-png-bg-rect-hor-png': '1728125317',
      '100x600-fg-rect-vert-svg-bg-rect-hor-svg': '1699736329',
      '100x600-fg-rect-vert-svg-bg-rect-hor-png': '43907932',
      '100x600-fg-rect-vert-png-bg-rect-hor-svg': '2030596731',
      '100x600-fg-rect-vert-png-bg-rect-hor-png': '931760125',
      '200x100-fg-rect-vert-svg-bg-rect-hor-svg': '1212262263',
      '200x100-fg-rect-vert-svg-bg-rect-hor-png': '2113640815',
      '200x100-fg-rect-vert-png-bg-rect-hor-svg': '683579926',
      '200x100-fg-rect-vert-png-bg-rect-hor-png': '1394476295',
      '200x200-fg-rect-vert-svg-bg-rect-hor-svg': '15254319',
      '200x200-fg-rect-vert-svg-bg-rect-hor-png': '1462297636',
      '200x200-fg-rect-vert-png-bg-rect-hor-svg': '125533298',
      '200x200-fg-rect-vert-png-bg-rect-hor-png': '820920891',
      '200x600-fg-rect-vert-svg-bg-rect-hor-svg': '1886133865',
      '200x600-fg-rect-vert-svg-bg-rect-hor-png': '235631678',
      '200x600-fg-rect-vert-png-bg-rect-hor-svg': '141267464',
      '200x600-fg-rect-vert-png-bg-rect-hor-png': '440341136',
      '600x100-fg-rect-vert-svg-bg-rect-hor-svg': '2031452644',
      '600x100-fg-rect-vert-svg-bg-rect-hor-png': '973940418',
      '600x100-fg-rect-vert-png-bg-rect-hor-svg': '2131617810',
      '600x100-fg-rect-vert-png-bg-rect-hor-png': '1240600008',
      '600x200-fg-rect-vert-svg-bg-rect-hor-svg': '1023614569',
      '600x200-fg-rect-vert-svg-bg-rect-hor-png': '1538197572',
      '600x200-fg-rect-vert-png-bg-rect-hor-svg': '1971726275',
      '600x200-fg-rect-vert-png-bg-rect-hor-png': '408439323',
      '600x600-fg-rect-vert-svg-bg-rect-hor-svg': '1150331201',
      '600x600-fg-rect-vert-svg-bg-rect-hor-png': '673829603',
      '600x600-fg-rect-vert-png-bg-rect-hor-svg': '298682560',
      '600x600-fg-rect-vert-png-bg-rect-hor-png': '1397380424',
      '100x100-fg-rect-hor-svg-bg-square-svg': '1846444795',
      '100x100-fg-rect-hor-svg-bg-square-png': '1644399003',
      '100x100-fg-rect-hor-png-bg-square-svg': '665196865',
      '100x100-fg-rect-hor-png-bg-square-png': '1216291455',
      '100x200-fg-rect-hor-svg-bg-square-svg': '1096172431',
      '100x200-fg-rect-hor-svg-bg-square-png': '1759066303',
      '100x200-fg-rect-hor-png-bg-square-svg': '327247469',
      '100x200-fg-rect-hor-png-bg-square-png': '258573787',
      '100x600-fg-rect-hor-svg-bg-square-svg': '1641833023',
      '100x600-fg-rect-hor-svg-bg-square-png': '1898304064',
      '100x600-fg-rect-hor-png-bg-square-svg': '2136576603',
      '100x600-fg-rect-hor-png-bg-square-png': '111653894',
      '200x100-fg-rect-hor-svg-bg-square-svg': '54663907',
      '200x100-fg-rect-hor-svg-bg-square-png': '1931268588',
      '200x100-fg-rect-hor-png-bg-square-svg': '1874113988',
      '200x100-fg-rect-hor-png-bg-square-png': '153549738',
      '200x200-fg-rect-hor-svg-bg-square-svg': '203351518',
      '200x200-fg-rect-hor-svg-bg-square-png': '1112710509',
      '200x200-fg-rect-hor-png-bg-square-svg': '1772753661',
      '200x200-fg-rect-hor-png-bg-square-png': '650009259',
      '200x600-fg-rect-hor-svg-bg-square-svg': '2133943241',
      '200x600-fg-rect-hor-svg-bg-square-png': '1097141463',
      '200x600-fg-rect-hor-png-bg-square-svg': '1711575296',
      '200x600-fg-rect-hor-png-bg-square-png': '1586617621',
      '600x100-fg-rect-hor-svg-bg-square-svg': '1619254323',
      '600x100-fg-rect-hor-svg-bg-square-png': '761402321',
      '600x100-fg-rect-hor-png-bg-square-svg': '84433832',
      '600x100-fg-rect-hor-png-bg-square-png': '1006899091',
      '600x200-fg-rect-hor-svg-bg-square-svg': '1473465169',
      '600x200-fg-rect-hor-svg-bg-square-png': '1668704707',
      '600x200-fg-rect-hor-png-bg-square-svg': '1464100892',
      '600x200-fg-rect-hor-png-bg-square-png': '1033716199',
      '600x600-fg-rect-hor-svg-bg-square-svg': '920404347',
      '600x600-fg-rect-hor-svg-bg-square-png': '2083892858',
      '600x600-fg-rect-hor-png-bg-square-svg': '588215001',
      '600x600-fg-rect-hor-png-bg-square-png': '1803508124',
      '100x100-fg-rect-hor-svg-bg-rect-vert-svg': '1644721610',
      '100x100-fg-rect-hor-svg-bg-rect-vert-png': '1811800975',
      '100x100-fg-rect-hor-png-bg-rect-vert-svg': '1833262465',
      '100x100-fg-rect-hor-png-bg-rect-vert-png': '1061544087',
      '100x200-fg-rect-hor-svg-bg-rect-vert-svg': '900931582',
      '100x200-fg-rect-hor-svg-bg-rect-vert-png': '1483041069',
      '100x200-fg-rect-hor-png-bg-rect-vert-svg': '335153165',
      '100x200-fg-rect-hor-png-bg-rect-vert-png': '45637561',
      '100x600-fg-rect-hor-svg-bg-rect-vert-svg': '362832021',
      '100x600-fg-rect-hor-svg-bg-rect-vert-png': '1889680160',
      '100x600-fg-rect-hor-png-bg-rect-vert-svg': '1903338111',
      '100x600-fg-rect-hor-png-bg-rect-vert-png': '2031836506',
      '200x100-fg-rect-hor-svg-bg-rect-vert-svg': '1252300694',
      '200x100-fg-rect-hor-svg-bg-rect-vert-png': '1233642558',
      '200x100-fg-rect-hor-png-bg-rect-vert-svg': '1226621788',
      '200x100-fg-rect-hor-png-bg-rect-vert-png': '60961540',
      '200x200-fg-rect-hor-svg-bg-rect-vert-svg': '360605364',
      '200x200-fg-rect-hor-svg-bg-rect-vert-png': '986241064',
      '200x200-fg-rect-hor-png-bg-rect-vert-svg': '865788966',
      '200x200-fg-rect-hor-png-bg-rect-vert-png': '1461162982',
      '200x600-fg-rect-hor-svg-bg-rect-vert-svg': '49885440',
      '200x600-fg-rect-hor-svg-bg-rect-vert-png': '2060161296',
      '200x600-fg-rect-hor-png-bg-rect-vert-svg': '2052560627',
      '200x600-fg-rect-hor-png-bg-rect-vert-png': '189921486',
      '600x100-fg-rect-hor-svg-bg-rect-vert-svg': '1847774636',
      '600x100-fg-rect-hor-svg-bg-rect-vert-png': '1832388629',
      '600x100-fg-rect-hor-png-bg-rect-vert-svg': '760916991',
      '600x100-fg-rect-hor-png-bg-rect-vert-png': '1430925783',
      '600x200-fg-rect-hor-svg-bg-rect-vert-svg': '1489125706',
      '600x200-fg-rect-hor-svg-bg-rect-vert-png': '886833953',
      '600x200-fg-rect-hor-png-bg-rect-vert-svg': '591032333',
      '600x200-fg-rect-hor-png-bg-rect-vert-png': '1019706165',
      '600x600-fg-rect-hor-svg-bg-rect-vert-svg': '1922869896',
      '600x600-fg-rect-hor-svg-bg-rect-vert-png': '942795514',
      '600x600-fg-rect-hor-png-bg-rect-vert-svg': '1882022400',
      '600x600-fg-rect-hor-png-bg-rect-vert-png': '1634119976',
      '100x100-fg-rect-hor-svg-bg-rect-hor-svg': '1568663181',
      '100x100-fg-rect-hor-svg-bg-rect-hor-png': '1465355320',
      '100x100-fg-rect-hor-png-bg-rect-hor-svg': '1646360107',
      '100x100-fg-rect-hor-png-bg-rect-hor-png': '492267662',
      '100x200-fg-rect-hor-svg-bg-rect-hor-svg': '874764803',
      '100x200-fg-rect-hor-svg-bg-rect-hor-png': '1499536612',
      '100x200-fg-rect-hor-png-bg-rect-hor-svg': '1769762101',
      '100x200-fg-rect-hor-png-bg-rect-hor-png': '748103838',
      '100x600-fg-rect-hor-svg-bg-rect-hor-svg': '292233965',
      '100x600-fg-rect-hor-svg-bg-rect-hor-png': '672172198',
      '100x600-fg-rect-hor-png-bg-rect-hor-svg': '2070434136',
      '100x600-fg-rect-hor-png-bg-rect-hor-png': '552672544',
      '200x100-fg-rect-hor-svg-bg-rect-hor-svg': '300509517',
      '200x100-fg-rect-hor-svg-bg-rect-hor-png': '1812389693',
      '200x100-fg-rect-hor-png-bg-rect-hor-svg': '27669026',
      '200x100-fg-rect-hor-png-bg-rect-hor-png': '1917193093',
      '200x200-fg-rect-hor-svg-bg-rect-hor-svg': '150816863',
      '200x200-fg-rect-hor-svg-bg-rect-hor-png': '1119795687',
      '200x200-fg-rect-hor-png-bg-rect-hor-svg': '261344274',
      '200x200-fg-rect-hor-png-bg-rect-hor-png': '1022247461',
      '200x600-fg-rect-hor-svg-bg-rect-hor-svg': '337172357',
      '200x600-fg-rect-hor-svg-bg-rect-hor-png': '156257661',
      '200x600-fg-rect-hor-png-bg-rect-hor-svg': '49677757',
      '200x600-fg-rect-hor-png-bg-rect-hor-png': '860273989',
      '600x100-fg-rect-hor-svg-bg-rect-hor-svg': '2139990054',
      '600x100-fg-rect-hor-svg-bg-rect-hor-png': '553851282',
      '600x100-fg-rect-hor-png-bg-rect-hor-svg': '1149482466',
      '600x100-fg-rect-hor-png-bg-rect-hor-png': '1908836564',
      '600x200-fg-rect-hor-svg-bg-rect-hor-svg': '771722515',
      '600x200-fg-rect-hor-svg-bg-rect-hor-png': '1640288655',
      '600x200-fg-rect-hor-png-bg-rect-hor-svg': '411258655',
      '600x200-fg-rect-hor-png-bg-rect-hor-png': '2144876601',
      '600x600-fg-rect-hor-svg-bg-rect-hor-svg': '521891305',
      '600x600-fg-rect-hor-svg-bg-rect-hor-png': '922592052',
      '600x600-fg-rect-hor-png-bg-rect-hor-svg': '238275082',
      '600x600-fg-rect-hor-png-bg-rect-hor-png': '1515508078'
    }
  }
  return map[key]
}
